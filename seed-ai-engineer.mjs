// seed-ai-engineer.mjs
// Seeds the AI Engineer career with all required production content.
// Run with: node seed-ai-engineer.mjs

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hiattulermsyqejkgloo.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpYXR0dWxlcm1zeXFlamtnbG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzA5MTQsImV4cCI6MjA5Mzc0NjkxNH0.vyrM8JberjXhv_JGu1hVX2GRyo03WALX1VnIbFJGIes";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SLUG = "ai-engineer";

/* ── CORE CAREER DATA ─────────────────────────────────── */
const coreData = {
  title: "AI Engineer",
  slug: SLUG,
  category: "Technology",
  description:
    "AI Engineers design, build, deploy, and maintain artificial intelligence systems that solve real-world problems using machine learning, deep learning, large language models, and data-driven technologies.",
  demand: "High",
  difficulty: "High",
  salary: "₹6 LPA – ₹30+ LPA",
  primary_color: "#7c3aed",
  secondary_color: "#4f46e5",
};

/* ── INSIGHTS ─────────────────────────────────────────── */
const insights = [
  {
    card_order: 1,
    small_heading: "What You Build",
    title: "You Build Intelligent Systems",
    short_description:
      "AI Engineers create software that can learn from data, recognize patterns, make predictions, generate content, and interact intelligently with users.",
    deep_details:
      "From recommendation engines to fraud detection systems, computer vision pipelines to large language model integrations, AI Engineers design and build the intelligent infrastructure that powers modern digital experiences. You work at the intersection of data science, software engineering, and machine learning to create systems that get smarter over time.",
  },
  {
    card_order: 2,
    small_heading: "Core Skills",
    title: "Math Meets Programming",
    short_description:
      "AI Engineering combines programming with mathematics, statistics, data analysis, and machine learning concepts.",
    deep_details:
      "Strong AI Engineers are comfortable with Python, PyTorch or TensorFlow, NumPy, Pandas, and SQL. But beyond code, they understand the mathematical foundations: linear algebra for understanding embeddings, probability and statistics for evaluating model performance, and calculus for understanding how neural networks learn through backpropagation.",
  },
  {
    card_order: 3,
    small_heading: "Scope of AI",
    title: "AI Is More Than Chatbots",
    short_description:
      "AI includes many areas such as machine learning, deep learning, computer vision, natural language processing, recommendation systems, robotics, and generative AI.",
    deep_details:
      "While generative AI and chatbots have captured public attention, the field is vast. AI Engineers work on autonomous systems, medical image analysis, real-time fraud detection, speech recognition, content moderation, predictive analytics, and much more. The breadth of the field means you can specialize in the domain that excites you most.",
  },
  {
    card_order: 4,
    small_heading: "Career Advice",
    title: "Projects Matter",
    short_description:
      "Courses alone are not enough. Strong AI Engineers build real projects, experiment with datasets, deploy applications, and demonstrate practical problem-solving skills.",
    deep_details:
      "Employers hire AI Engineers who can demonstrate results, not just knowledge. Build end-to-end projects: train a model on a real dataset, build an API around it, deploy it to the cloud, and share your code. Contributing to open source, writing technical blog posts, and publishing Kaggle notebooks are all ways to build a compelling portfolio that sets you apart.",
  },
];

/* ── WHY EXISTS ────────────────────────────────────────── */
const whyExists = [
  {
    display_order: 1,
    heading: "Turning Data Into Intelligence",
    content:
      "Modern organizations generate enormous amounts of data. AI Engineers build systems that analyze this information, identify patterns, and make useful predictions or decisions. Every industry — from healthcare to finance to logistics — needs engineers who can extract value from data at scale.",
  },
  {
    display_order: 2,
    heading: "Automating Complex Problems",
    content:
      "AI helps automate tasks such as image recognition, fraud detection, recommendation systems, language translation, and intelligent customer support. These aren't simple rule-based automations — they require engineers who understand how to train, evaluate, and deploy machine learning models that handle real-world complexity.",
  },
  {
    display_order: 3,
    heading: "Creating New Digital Experiences",
    content:
      "Generative AI, intelligent assistants, computer vision, and autonomous systems are creating entirely new ways for people to interact with technology. AI Engineers are at the forefront of this transformation, building experiences that were impossible just a few years ago.",
  },
];

/* ── SCENES ────────────────────────────────────────────── */
const scenes = [
  {
    display_order: 1,
    title: "Training a Machine Learning Model",
    description:
      "Prepare data, experiment with algorithms, train models, evaluate performance, and improve results through repeated testing. You spend hours with Jupyter notebooks, experiment tracking tools like MLflow, and GPU compute resources.",
    image_url: "",
  },
  {
    display_order: 2,
    title: "Building an AI Product",
    description:
      "Work with software engineers and product teams to integrate AI models into real applications that users can interact with. You bridge the gap between research and production, making sure models run reliably at scale.",
    image_url: "",
  },
  {
    display_order: 3,
    title: "Solving Real Problems",
    description:
      "Build systems that detect fraud, recommend products, understand language, analyze images, generate content, or make useful predictions. You see the direct impact of your work in the products and services millions of people use.",
    image_url: "",
  },
];

/* ── PATH STEPS ────────────────────────────────────────── */
const pathSteps = [
  {
    display_order: 1,
    heading: "Programming Foundations",
    percentage: 10,
    short_description:
      "Learn Python and strong programming fundamentals including variables, functions, loops, data structures, object-oriented programming, and problem-solving.",
  },
  {
    display_order: 2,
    heading: "Mathematics and Statistics",
    percentage: 22,
    short_description:
      "Learn practical foundations of linear algebra, probability, statistics, calculus basics, and optimization concepts.",
  },
  {
    display_order: 3,
    heading: "Data Skills",
    percentage: 35,
    short_description:
      "Learn to work with data using NumPy, Pandas, SQL, and visualization tools.",
  },
  {
    display_order: 4,
    heading: "Machine Learning",
    percentage: 48,
    short_description:
      "Learn supervised and unsupervised learning, regression, classification, clustering, feature engineering, model evaluation, and Scikit-learn.",
  },
  {
    display_order: 5,
    heading: "Deep Learning",
    percentage: 62,
    short_description:
      "Learn neural networks, CNNs, transformers, embeddings, and frameworks such as PyTorch or TensorFlow.",
  },
  {
    display_order: 6,
    heading: "Generative AI and LLMs",
    percentage: 75,
    short_description:
      "Learn how to build modern AI applications using LLM APIs, embeddings, RAG pipelines, vector databases, and AI agents.",
  },
  {
    display_order: 7,
    heading: "Build Real Projects",
    percentage: 87,
    short_description:
      "Create complete AI projects that solve real-world problems and publish your code, demos, and documentation.",
  },
  {
    display_order: 8,
    heading: "Deployment and MLOps",
    percentage: 100,
    short_description:
      "Learn APIs, Docker, cloud deployment, model monitoring, versioning, and production AI engineering practices.",
  },
];

/* ── FUTURE ROLES ──────────────────────────────────────── */
const futureRoles = [
  {
    role_name: "Machine Learning Engineer",
    short_description:
      "Build, train, optimize, and deploy machine learning models that power intelligent product features.",
    image_url: "",
  },
  {
    role_name: "Generative AI Engineer",
    short_description:
      "Build applications using large language models, RAG pipelines, AI agents, embeddings, and multimodal AI systems.",
    image_url: "",
  },
  {
    role_name: "Computer Vision Engineer",
    short_description:
      "Develop AI systems that understand images and videos for applications in healthcare, security, robotics, and more.",
    image_url: "",
  },
  {
    role_name: "NLP Engineer",
    short_description:
      "Build systems that understand and generate human language — from chatbots to translation to document intelligence.",
    image_url: "",
  },
  {
    role_name: "MLOps Engineer",
    short_description:
      "Build infrastructure and workflows for training, deploying, monitoring, and maintaining machine learning systems in production.",
    image_url: "",
  },
];

/* ── SEED ──────────────────────────────────────────────── */
async function seed() {
  console.log("🔍 Finding AI Engineer career...");

  // 1. Find existing career by slug
  const { data: existing, error: fetchError } = await supabase
    .from("careers")
    .select("id, slug, title")
    .eq("slug", SLUG)
    .maybeSingle();

  if (fetchError) {
    console.error("❌ Error fetching career:", fetchError.message);
    process.exit(1);
  }

  let careerId;
  if (existing) {
    console.log(`✅ Found: "${existing.title}" (id=${existing.id})`);
    careerId = existing.id;

    // 2a. Update core fields
    const { error: updateError } = await supabase
      .from("careers")
      .update(coreData)
      .eq("id", careerId);
    if (updateError) {
      console.error("❌ Update error:", updateError.message);
      process.exit(1);
    }
    console.log("✅ Core career updated.");
  } else {
    console.log("➕ No career found with slug 'ai-engineer'. Creating...");
    const { data: created, error: createError } = await supabase
      .from("careers")
      .insert({
        ...coreData,
        hero_image: "",
        hero_video: "",
        future_scope: "Exceptional — AI is the defining technology of our era.",
        universe_nodes: [],
        paths: [],
      })
      .select("id")
      .single();

    if (createError) {
      console.error("❌ Create error:", createError.message);
      process.exit(1);
    }
    careerId = created.id;
    console.log(`✅ Created new career (id=${careerId})`);
  }

  // 3. Delete and re-insert all child tables
  console.log("\n🗑  Clearing old content...");

  await supabase.from("career_insights").delete().eq("career_slug", SLUG);
  await supabase.from("career_why_exists").delete().eq("career_slug", SLUG);
  await supabase.from("career_scenes").delete().eq("career_slug", SLUG);
  await supabase.from("career_path_steps").delete().eq("career_slug", SLUG);
  await supabase.from("career_future_roles").delete().eq("career_slug", SLUG);

  console.log("✅ Cleared.");

  // 4. Insert insights
  const { error: insightsError } = await supabase
    .from("career_insights")
    .insert(insights.map((i) => ({ ...i, career_slug: SLUG })));
  if (insightsError) console.error("❌ Insights error:", insightsError.message);
  else console.log(`✅ Inserted ${insights.length} insights.`);

  // 5. Insert whyExists
  const { error: whyError } = await supabase
    .from("career_why_exists")
    .insert(whyExists.map((w) => ({ ...w, career_slug: SLUG })));
  if (whyError) console.error("❌ Why Exists error:", whyError.message);
  else console.log(`✅ Inserted ${whyExists.length} why-exists blocks.`);

  // 6. Insert scenes
  const { error: scenesError } = await supabase
    .from("career_scenes")
    .insert(scenes.map((s) => ({ ...s, career_slug: SLUG })));
  if (scenesError) console.error("❌ Scenes error:", scenesError.message);
  else console.log(`✅ Inserted ${scenes.length} scenes.`);

  // 7. Insert path steps
  const { error: stepsError } = await supabase
    .from("career_path_steps")
    .insert(pathSteps.map((p) => ({ ...p, career_slug: SLUG })));
  if (stepsError) console.error("❌ Path Steps error:", stepsError.message);
  else console.log(`✅ Inserted ${pathSteps.length} roadmap steps.`);

  // 8. Insert future roles
  const { error: rolesError } = await supabase
    .from("career_future_roles")
    .insert(futureRoles.map((r) => ({ ...r, career_slug: SLUG })));
  if (rolesError) console.error("❌ Future Roles error:", rolesError.message);
  else console.log(`✅ Inserted ${futureRoles.length} future roles.`);

  console.log("\n🎉 AI Engineer career seeded successfully!");
  console.log(`   Career ID: ${careerId}`);
  console.log(`   Slug: ${SLUG}`);
  console.log(`   Editor: /admin/careers/${careerId}`);
  console.log(`   Public page: /career/${SLUG}`);
}

seed().catch(console.error);
