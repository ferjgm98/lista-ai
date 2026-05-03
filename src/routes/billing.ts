import { Hono } from 'hono';
import { getDb } from '../db';
import { PLANS } from '../types';

const billing = new Hono();

// Get available plans
billing.get('/plans', async (c) => {
  return c.json({
    success: true,
    data: PLANS.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      listings_per_month: p.listings_per_month,
      images_per_month: p.images_per_month,
      features: p.features,
      is_free: p.price === 0,
    })),
  });
});

// Get current subscription
billing.get('/subscription', async (c) => {
  const payload = c.get('jwtPayload');
  const db = getDb();

  const user = db.query('SELECT id, plan, credits_remaining FROM users WHERE id = ?').get(payload.sub) as any;
  if (!user) {
    return c.json({ success: false, error: 'User not found' }, 404);
  }

  const monthlyCount = db
    .query(
      `SELECT COUNT(*) as count FROM listings
       WHERE user_id = ? AND created_at > datetime('now', '-30 days')`
    )
    .get(user.id) as any;

  return c.json({
    success: true,
    data: {
      plan: user.plan,
      credits_remaining: user.credits_remaining,
      listings_used_this_month: monthlyCount.count,
      plan_details: PLANS.find((p) => p.id === user.plan),
    },
  });
});

// Create Stripe checkout session (for upgrading)
billing.post('/checkout', async (c) => {
  const payload = c.get('jwtPayload');
  const body = await c.req.json();
  const planId = body.plan; // 'starter' | 'pro'

  if (!['starter', 'pro'].includes(planId)) {
    return c.json({ success: false, error: 'Invalid plan' }, 400);
  }

  // TODO: Implement Stripe checkout session creation
  // const session = await stripe.checkout.sessions.create({
  //   customer_email: payload.email,
  //   mode: 'subscription',
  //   line_items: [{ price: PRICE_IDS[planId], quantity: 1 }],
  //   success_url: `${APP_URL}/dashboard?checkout=success`,
  //   cancel_url: `${APP_URL}/pricing`,
  //   metadata: { userId: payload.sub },
  // });
  // return c.json({ success: true, data: { url: session.url } });

  return c.json({
    success: true,
    data: {
      url: '/pricing',
      message: 'Stripe integration pending. MVP override.',
    },
  });
});

// Stripe webhook handler
billing.post('/webhook', async (c) => {
  // TODO: Verify Stripe webhook signature
  // const sig = c.req.header('stripe-signature');
  // const event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  //
  // if (event.type === 'checkout.session.completed') {
  //   const session = event.data.object;
  //   const userId = session.metadata.userId;
  //   const plan = PRICE_TO_PLAN[session.line_items?.data[0]?.price?.id];
  //   getDb().run('UPDATE users SET plan = ? WHERE id = ?', [plan, userId]);
  // }

  return c.json({ received: true });
});

export default billing;
