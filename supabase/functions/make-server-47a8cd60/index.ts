// @ts-ignore Deno spezifisch
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";// supabase/functions/make-server-47a8cd60/index.ts
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.ts";

const app = new Hono();

// Orijin, log vb.
app.use("*", cors());
app.use("*", logger());

// Supabase client (Service Role anahtarıyla admin işlemleri için)
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Access token’dan user çek
const getUser = async (request: Request) => {
  const accessToken = request.headers.get("Authorization")?.split(" ")[1];
  if (!accessToken) return null;

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error) {
    console.log("Auth error:", error);
    return null;
  }
  return data.user ?? null;
};

// ---------- AUTH ----------
app.post("/make-server-47a8cd60/auth/signup", async (c) => {
  try {
    const { email, password, name, role = "customer" } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      email_confirm: true,
    });
    if (error) return c.json({ error: error.message }, 400);

    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    });

    return c.json({ user: data.user });
  } catch (e) {
    console.log("Signup error:", e);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// ---------- BERATER ----------
app.get("/make-server-47a8cd60/berater", async (c) => {
  const rows = await kv.getByPrefix("berater:");
  return c.json(rows.map((r) => r.value));
});

app.get("/make-server-47a8cd60/berater/:id", async (c) => {
  const id = c.req.param("id");
  const berater = await kv.get<any>(`berater:${id}`);
  if (!berater) return c.json({ error: "Berater not found" }, 404);

  const reviews = await kv.getByPrefix<any>(`review:berater:${id}:`);
  berater.reviews = reviews.map((r) => r.value);
  return c.json(berater);
});

app.post("/make-server-47a8cd60/berater", async (c) => {
  const user = await getUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const berater = {
    id,
    userId: user.id,
    ...body,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await kv.set(`berater:${id}`, berater);
  return c.json(berater);
});

// ---------- REVIEWS ----------
app.post("/make-server-47a8cd60/reviews", async (c) => {
  const user = await getUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const { beraterId, rating, text } = await c.req.json();
  const reviewId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const review = {
    id: reviewId,
    beraterId,
    userId: user.id,
    rating,
    text,
    createdAt: new Date().toISOString(),
  };

  await kv.set(`review:berater:${beraterId}:${reviewId}`, review);

  const berater = await kv.get<any>(`berater:${beraterId}`);
  if (berater) {
    const reviews = await kv.getByPrefix<any>(`review:berater:${beraterId}:`);
    const total = reviews.reduce((s, r) => s + (r.value.rating || 0), 0);
    berater.rating = Math.round((total / reviews.length) * 10) / 10;
    berater.reviewCount = reviews.length;
    berater.updatedAt = new Date().toISOString();
    await kv.set(`berater:${beraterId}`, berater);
  }

  return c.json(review);
});

// ---------- CHAT ----------
app.post("/make-server-47a8cd60/chat/messages", async (c) => {
  const { sessionId, message, sender } = await c.req.json();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const row = {
    id,
    sessionId,
    message,
    sender, // 'user' | 'bot' | 'berater'
    timestamp: new Date().toISOString(),
  };
  await kv.set(`chat:${sessionId}:${id}`, row);
  return c.json(row);
});

app.get("/make-server-47a8cd60/chat/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  const rows = await kv.getByPrefix<any>(`chat:${sessionId}:`);
  const list = rows.map((r) => r.value).sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  return c.json(list);
});

// ---------- QR ----------
app.post("/make-server-47a8cd60/qr-codes", async (c) => {
  const user = await getUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const { beraterId, type = "profile" } = await c.req.json();
  const qrId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const qr = {
    id: qrId,
    beraterId,
    type, // 'profile' | 'whatsapp'
    url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/make-server-47a8cd60/qr/${qrId}`,
    scans: 0,
    createdAt: new Date().toISOString(),
  };
  await kv.set(`qr:${qrId}`, qr);
  return c.json(qr);
});

app.get("/make-server-47a8cd60/qr/:id", async (c) => {
  const id = c.req.param("id");
  const qr = await kv.get<any>(`qr:${id}`);
  if (!qr) return c.json({ error: "QR code not found" }, 404);

  qr.scans = (qr.scans || 0) + 1;
  qr.lastScanned = new Date().toISOString();
  await kv.set(`qr:${id}`, qr);

  const berater = await kv.get<any>(`berater:${qr.beraterId}`);
  if (qr.type === "whatsapp" && berater?.whatsapp) {
    return c.redirect(`https://wa.me/${berater.whatsapp.replace("+", "").replace(/ /g, "")}`);
  }
  return c.redirect(`${Deno.env.get("SUPABASE_URL")}/berater/${qr.beraterId}`);
});

// ---------- ANALYTICS ----------
app.get("/make-server-47a8cd60/analytics/overview", async (c) => {
  const user = await getUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const bs = await kv.getByPrefix<any>("berater:");
  const rs = await kv.getByPrefix<any>("review:");
  const qs = await kv.getByPrefix<any>("qr:");

  const stats = {
    totalBerater: bs.length,
    totalReviews: rs.length,
    totalQRCodes: qs.length,
    totalQRScans: qs.reduce((s, row) => s + (row.value.scans || 0), 0),
  };
  return c.json(stats);
});

// ---------- INIT + HEALTH ----------
app.post("/make-server-47a8cd60/init", async (c) => {
  const exists = await kv.get("system:initialized");
  if (exists) return c.json({ message: "Already initialized" });

  const seed = [
    {
      id: "berater-1",
      name: "Michael Schmidt",
      location: "Hamburg",
      email: "michael@ohnequatschdeals.de",
      whatsapp: "+49151234567890",
      specialties: ["Internet & TV", "Mobilfunk"],
      aboutMe:
        "Seit 5 Jahren helfe ich Kunden bei der Suche nach den besten Tarifen.",
      rating: 4.8,
      reviewCount: 156,
      stats: { customers: "500+", experience: "5 Jahre", responseTime: "< 2h" },
      createdAt: new Date().toISOString(),
    },
    {
      id: "berater-2",
      name: "Sarah Weber",
      location: "München",
      email: "sarah@ohnequatschdeals.de",
      whatsapp: "+49151234567891",
      specialties: ["Strom & Gas", "Kredite"],
      aboutMe: "Energieexpertin mit Leidenschaft für nachhaltige Lösungen.",
      rating: 4.9,
      reviewCount: 203,
      stats: { customers: "750+", experience: "7 Jahre", responseTime: "< 1h" },
      createdAt: new Date().toISOString(),
    },
  ];
  for (const b of seed) await kv.set(`berater:${b.id}`, b);

  await kv.set("system:initialized", { at: new Date().toISOString() });
  return c.json({ message: "System initialized successfully" });
});

app.get("/make-server-47a8cd60/health", (c) =>
  c.json({ status: "OK", timestamp: new Date().toISOString() })
);

// Deno entry
Deno.serve(app.fetch);// Deno entry
serve(app.fetch);
