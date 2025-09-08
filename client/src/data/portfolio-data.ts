export const personalInfo = {
  name: "Azin Faghihi",
  title: "Data Scientist",
  email: "azin.faghihi@gmail.com",
  github: "https://www.github.com/ozayn",
  linkedin: "https://www.linkedin.com/in/azin-faghihi",
  medium: "https://medium.com/@azin.faghihi",
  website: "ozayn.github.io",
  location: "Washington, DC",
  about: "Data Scientist specialized in human behavior analytics, data visualization, and complex dataset analysis. Background in Mechanical and Software Engineering provides structured and innovative problem-solving approaches."
};

export const projects = [
  {
    id: 1,
    title: "Stock Market News Sentiment Analysis",
    description: "Advanced NLP system leveraging LLMs, Transformers, and Prompt Engineering to extract market sentiment from financial news articles.",
    overview: "Built an AI-driven system leveraging Large Language Models (LLMs), Transformers architecture, and Prompt Engineering to extract and summarize market sentiment from financial news articles. The NLP system processes news content through advanced preprocessing pipelines, utilizing state-of-the-art Transformers for sentiment classification and custom Prompt Engineering strategies to optimize LLM performance for financial context understanding.",
    technologies: ["NLP", "LLMs", "Transformers", "Prompt Engineering"],
    category: "nlp",
    icon: "chart-line",
    githubUrl: "https://github.com/ozayn/AIML-projects/tree/main/Stock%20Market%20News%20Sentiment%20Analysis%20%26%20Summarization",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Stock%20Market%20News%20Sentiment%20Analysis%20%26%20Summarization/Presentation.pdf",
    detailPageUrl: "/stock-market-sentiment",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Stock%20Market%20News%20Sentiment%20Analysis%20%26%20Summarization/images/label_distribution.png",
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Stock%20Market%20News%20Sentiment%20Analysis%20%26%20Summarization/images/histplot_boxplot_News%20Length_vs_Label.png"
    ]
  },
  {
    id: 2,
    title: "Plant Seedling Classification",
    description: "Advanced Computer Vision system using TensorFlow and Transfer Learning to distinguish plant seedlings and weeds for precision agriculture.",
    overview: "Built an advanced Computer Vision image classifier leveraging TensorFlow deep learning framework and Transfer Learning techniques to distinguish plant seedlings and weeds for agricultural applications. This precision agriculture system uses state-of-the-art Computer Vision algorithms and TensorFlow's neural network capabilities with Transfer Learning from pre-trained models to help farmers identify and manage crop growth through automated plant species classification.",
    technologies: ["Computer Vision", "TensorFlow", "Transfer Learning"],
    category: "computer-vision",
    icon: "eye",
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Plant%20Seedling%20Classification/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Plant%20Seedling%20Classification/Presentation.pdf",
    detailPageUrl: "/plant-seedling-classification",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Plant%20Seedling%20Classification/images/prediction_sample_correct_wrong.png"
    ]
  },
  {
    id: 3,
    title: "Bank Customer Churn Prediction",
    description: "Deep Learning with Neural Networks, TensorFlow, and Keras for advanced customer behavior analysis and churn prediction.",
    overview: "Developed an advanced artificial Neural Network from scratch using TensorFlow and Keras to identify high-risk churn customers through sophisticated Deep Learning techniques. This predictive modeling project leverages Neural Networks and TensorFlow's deep learning capabilities to analyze customer behavior patterns and demographic data, predicting which customers are most likely to leave the bank. The model employs Deep Learning algorithms and Neural Network architectures to enable proactive customer retention strategies by identifying at-risk customers before they churn.",
    technologies: ["Neural Networks", "TensorFlow", "Keras", "Deep Learning"],
    category: "deep-learning",
    icon: "brain",
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Bank%20Customer%20Churn%20Prediction/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Bank%20Customer%20Churn%20Prediction/Presentation.pdf",
    detailPageUrl: "/bank-customer-churn-prediction",
    images: ["https://raw.githubusercontent.com/ozayn/AIML-projects/main/Bank%20Customer%20Churn%20Prediction/images/heatmap_corr_categorical_corner.png"]
  },
  {
    id: 4,
    title: "Credit Card User Churn Prediction",
    description: "Advanced Ensemble Learning using Random Forest, AdaBoost, SMOTE oversampling, and Hyperparameter Tuning for churn prediction.",
    overview: "Built an advanced predictive model to classify churn behavior using Ensemble Learning methods including Random Forest, AdaBoost, Gradient Boosting, and SMOTE oversampling with comprehensive Hyperparameter Tuning. This machine learning project addresses class imbalance in credit card customer data using advanced Ensemble Methods and sampling techniques to predict which customers are likely to cancel their cards. The model employs sophisticated Feature Engineering and Ensemble Learning algorithms to improve prediction accuracy and provide actionable insights for customer retention strategies in the financial services industry.",
    technologies: ["Ensemble Learning", "Random Forest", "AdaBoost", "SMOTE", "Hyperparameter Tuning"],
    category: "ensemble-learning",
    icon: "seedling",
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Credit%20Card%20User%20Churn%20Prediction/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Credit%20Card%20User%20Churn%20Prediction/Presentation.pdf",
    detailPageUrl: "/credit-card-churn-prediction",
    images: ["https://raw.githubusercontent.com/ozayn/AIML-projects/main/Credit%20Card%20User%20Churn%20Prediction/images/pairplot_categorical.png"]
  },
  {
    id: 5,
    title: "Personal Loan Campaign Analysis",
    description: "Advanced Decision Trees and Marketing Analytics for targeted loan campaigns with comprehensive customer segmentation strategies.",
    overview: "Analyzed customer attributes and built advanced Decision Tree models using Marketing Analytics techniques to predict loan acquisition likelihood and guide targeted marketing strategies. This comprehensive data analysis project examines customer demographics, financial behavior, and historical loan data using Decision Trees and Marketing Analytics to identify patterns that indicate loan acceptance probability. The model provides actionable insights for financial institutions to optimize their marketing campaigns through advanced Decision Tree analysis and targeted customer segmentation strategies.",
    technologies: ["Decision Trees", "Marketing Analytics", "Customer Segmentation", "Data Analysis"],
    category: "marketing-analytics",
    icon: "tree-pine",
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Personal%20Loan%20Campaign/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Personal%20Loan%20Campaign/Presentation.pdf",
    detailPageUrl: "/personal-loan-campaign",
    images: ["https://raw.githubusercontent.com/ozayn/AIML-projects/main/Personal%20Loan%20Campaign/images/histplot_boxplot_Income_vs_Education.png"]
  },
  {
    id: 6,
    title: "Subreddit Classification",
    description: "Applied natural language processing to classify texts from Yoga and Meditation subreddits using advanced NLP techniques.",
    overview: "Applied natural language processing to classify texts from Yoga and Meditation subreddits to develop a wellness program recommendation system. This project uses advanced NLP techniques including TF-IDF vectorization, Multinomial Naive Bayes, and Random Forest classification to analyze text patterns and personality types. The model achieved 88% accuracy in distinguishing between Yoga and Meditation practitioners, providing valuable insights for corporate wellness programs and employee personality-based recommendations.",
    technologies: ["NLP", "Text Classification", "Machine Learning", "Python"],
    category: "text-classification",
    icon: "comments",
    githubUrl: "https://github.com/ozayn/subreddit_classification_nlp",
    presentationUrl: "https://github.com/ozayn/subreddit_classification_nlp/blob/main/presentation/Project_3_presentation_Azin.pdf",
    detailPageUrl: "/subreddit-classification",
    images: [
      "https://ozayn.github.io/images/project2/character_word_count_dist_title_content.png",
      "https://ozayn.github.io/images/project2/top_occurring_ngram_1_2.png"
    ]
  },
  {
    id: 7,
    title: "Standardized Test Analysis",
    description: "Compared college admission requirements with state test score averages using geospatial analysis and provided educational policy recommendations.",
    overview: "Figure out how the minimum college SAT/ACT requirements compare to the average of those scores in each state. In case the minimum requirement is higher than the state average, suggest solutions or further studies. This project analyzes 2017-2019 SAT and ACT scores by state, along with college admission requirements, using GeoPandas for geospatial visualization to identify states where average minimum college requirements exceed state averages and provide actionable recommendations for educational policy improvements.",
    technologies: ["Python", "Pandas", "GeoPandas", "Data Visualization"],
    category: "exploratory-analysis", 
    icon: "map",
    images: ["https://raw.githubusercontent.com/ozayn/AIML-projects/main/Standardized%20Test%20Analysis/images/top_ranking_map.png"],
    githubUrl: "https://github.com/ozayn/AIML-projects/tree/main/Standardized%20Test%20Analysis/code",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Standardized%20Test%20Analysis/Presentation.pdf",
    detailPageUrl: "/standardized-test-analysis"
  },
  {
    id: 8,
    title: "FoodHub Orders",
    description: "Performed comprehensive EDA on restaurant orders to uncover demand patterns and provide business optimization recommendations.",
    overview: "Analyzing ~2K restaurant orders to uncover patterns in customer behavior, delivery dynamics, and revenue. FoodHub wants to optimize restaurant operations and customer satisfaction using data from previous orders. Explored 1,898 rows with 9 columns through univariate and multivariate analysis across cuisines, delivery metrics, cost, ratings, and time to help the company understand demand trends and improve customer experience.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Tabulate"],
    category: "business-analytics",
    icon: "utensils",
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/FoodHub/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/FoodHub/Presentation.pdf",
    detailPageUrl: "/foodhub-orders",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/FoodHub/images/histplot_cost_of_the_order.png",
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/FoodHub/images/boxplot_cuisine_type_food_preparation_time.png"
    ]
  },
  {
    id: 9,
    title: "Graphs & Networks Exploration",
    description: "Analyzed offshore financial networks using graph theory and network analysis to explore real-world connection patterns.",
    overview: "Explored the real network of Offshore Leaks using data from The International Consortium of Investigative Journalists' database. Applied graph theory and network analysis to study connection patterns, discovering that the data followed the Preferential Attachment Model when analyzing in-degree and out-degrees. This project demonstrates advanced network analysis techniques for understanding complex real-world relationships in financial data.",
    technologies: ["Graph Theory", "Network Analysis", "Python", "NetworkX"],
    category: "graph-theory",
    icon: "network-wired",
    githubUrl: "https://github.com/ozayn/Capstone_project_GA",
    presentationUrl: "https://github.com/ozayn/Capstone_project_GA/blob/main/presentation/capstone_project_presentation_Azin.pdf",
    detailPageUrl: "/graphs-networks",
    images: [
      "https://ozayn.github.io/images/project1/03_link_secretary_of_wcon_loglog.png",
      "https://ozayn.github.io/images/project1/degree_distribution_log_log_linear.png"
    ]
  }
];

export const experience = [
  {
    id: 1,
    title: "Data Scientist",
    company: "Amida Technology Solutions",
    location: "Washington, DC",
    period: "February 2022 – June 2025",
    bullets: [
      "Automated veteran hospitalization report processing, enhancing efficiency using Python, Toad for Oracle, SQL Server, AzureML, PySpark",
      "Developed synthetic EHR datasets, visualizing synthetic-real data comparisons with i2b2",
      "Conducted time-series forecasting using Meta Prophet and ARIMA for improved accuracy"
    ],
    technologies: ["Python", "Azure ML", "PySpark", "SQL Server", "Toad for Oracle", "i2b2", "Meta Prophet", "ARIMA"]
  },
  {
    id: 2,
    title: "Data Science Projects",
    company: "McCombs School of Business, UT Austin",
    location: "Online",
    period: "September 2024 – June 2025",
    bullets: [
      "Stock Market Sentiment Analysis: Implemented LLMs and Transformers to analyze financial news sentiment and predict market movements",
      "Plant Seedling Classification: Developed computer vision models using CNN architectures to classify different plant species with 95% accuracy",
      "Bank Customer Churn Prediction: Built neural network models to predict customer churn with feature engineering and hyperparameter tuning",
      "Credit Card User Churn Prediction: Applied ensemble methods including Random Forest and XGBoost with SMOTE for class imbalance handling",
      "Natural Language Processing: Performed text preprocessing, tokenization, and sentiment analysis on large-scale datasets",
      "Deep Learning Implementation: Designed and trained custom neural network architectures using TensorFlow and Keras",
      "Model Evaluation and Optimization: Conducted comprehensive model validation using cross-validation and performance metrics"
    ],
    technologies: ["LLMs", "Transformers", "TensorFlow", "Neural Networks", "Random Forest", "SMOTE", "Computer Vision", "NLP", "XGBoost", "Keras", "CNN"]
  }
];

export const education = [
  {
    id: 1,
    degree: "Ph.D. Mechanical Engineering",
    school: "UCLA",
    period: "2009-2014",
    details: "Field: Systems & Control - Adaptive Optics, Minor: Dynamics"
  },
  {
    id: 2,
    degree: "M.S. Mechanical Engineering",
    school: "UCLA",
    period: "2009-2014",
    details: ""
  },
  {
    id: 3,
    degree: "B.S. Mechanical Engineering",
    school: "UC Berkeley",
    period: "2003-2006",
    details: "Minor: Theater & Performance Studies"
  }
];

export const skills = {
  "Programming Languages": ["Python", "R", "SQL", "MATLAB", "C++", "JavaScript"],
  "Machine Learning & AI": ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "XGBoost", "Random Forest", "Neural Networks", "LLMs", "Transformers"],
  "Data Science & Analytics": ["Pandas", "NumPy", "Seaborn", "Matplotlib", "Plotly", "Jupyter", "EDA", "Statistical Analysis", "Time Series Analysis"],
  "Big Data & Cloud": ["PySpark", "Azure ML", "AWS", "Google Cloud", "Apache Spark", "Hadoop", "Databricks"],
  "Databases & Tools": ["SQL Server", "Oracle", "PostgreSQL", "Toad for Oracle", "i2b2", "Git", "Docker"],
  "Specialized Skills": ["Computer Vision", "NLP", "Deep Learning", "Forecasting", "ARIMA", "Meta Prophet", "SMOTE", "Feature Engineering"]
};

export const photographyCategories = ["all", "street", "portraits", "urban", "travel", "candid", "long-exposure", "wedding", "events", "models"];

// EASY WAY TO ADD YOUR INSTAGRAM PHOTOS:
// 1. Open Instagram.com/@ozayn in your browser
// 2. Right-click on any photo and select "Open image in new tab"
// 3. Copy the URL from the new tab (it will be a long Instagram CDN URL)
// 4. Replace the "src" and "fullSrc" URLs below with your copied URL
// 5. Update title, category, and description to match your photo
// 6. Available categories: "street", "portraits", "urban", "travel", "candid"
//
// Pro tip: Instagram URLs work directly and are optimized for web display!

export const photographyImages = [
  {
    id: 1,
    title: "Coastal Serenity",
    category: "long-exposure",
    src: "/images/optimized_1-2mb_DSC02830_1751747402944.JPG",
    fullSrc: "/images/optimized_1-2mb_DSC02830_1751747402944.JPG",
    description: "Long exposure seascape capturing the ethereal movement of waves against weathered rocks",
    tags: ["seascape", "waves", "rocks", "water", "motion", "nature", "coastal", "ethereal"]
  },
  {
    id: 100,
    title: "Wave Motion",
    category: "long-exposure",
    src: "/images/optimized_1-2mb_DSC02829_1751747653606.JPG",
    fullSrc: "/images/optimized_1-2mb_DSC02829_1751747653606.JPG",
    description: "Dynamic long exposure capturing the powerful flow and light trails of cascading waves",
    tags: ["waves", "motion", "water", "dynamic", "light-trails", "cascading", "flow", "energy"]
  },
  {
    id: 4,
    title: "Summer Stroll",
    category: "street",
    src: "/images/optimized_1-2mb_DSCF3479_1751748628308.JPG",
    fullSrc: "/images/optimized_1-2mb_DSCF3479_1751748628308.JPG",
    description: "Candid street moment capturing the innocence of childhood amid the urban bustle",
    tags: ["street", "candid", "childhood", "urban", "summer", "walking", "documentary", "life"]
  },
  {
    id: 114,
    title: "Festival Style",
    category: "events",
    event: "Old Town Festival of Speed & Style",
    src: "/images/optimized_1-2mb_DSCF4430_1751762032638.JPG",
    fullSrc: "/images/optimized_1-2mb_DSCF4430_1751762032638.JPG",
    description: "",
    tags: ["festival", "vintage", "fashion", "style", "group", "formal", "elegant", "event"]
  },
  {
    id: 111,
    title: "Wedding Cake Topper",
    category: "wedding",
    src: "/images/optimized_1-2mb_DSCF6775_1751760870510.jpg",
    fullSrc: "/images/optimized_1-2mb_DSCF6775_1751760870510.jpg",
    description: "",
    tags: ["wedding", "cake", "topper", "details", "celebration", "romance", "decoration", "close-up"]
  },
  {
    id: 101,
    title: "Wedding Elegance",
    category: "wedding",
    src: "/attached_assets/photo_2025-07-05 16.51.20_1751748696098.jpeg",
    fullSrc: "/attached_assets/photo_2025-07-05 16.51.20_1751748696098.jpeg",
    description: "Capturing the timeless beauty and emotion of wedding celebrations",
    tags: ["wedding", "elegance", "celebration", "beauty", "emotion", "timeless", "formal", "love"]
  },
  {
    id: 102,
    title: "Bridal Grace",
    category: "wedding",
    src: "/attached_assets/photo_2025-07-05 16.51.11_1751748696099.jpeg",
    fullSrc: "/attached_assets/photo_2025-07-05 16.51.11_1751748696099.jpeg",
    description: "Intimate moments and delicate details of the special day"
  },
  {
    id: 103,
    title: "Ceremony Moments",
    category: "wedding",
    src: "/attached_assets/photo_2025-07-05 16.51.04_1751748696099.jpeg",
    fullSrc: "/attached_assets/photo_2025-07-05 16.51.04_1751748696099.jpeg",
    description: "Authentic emotions and cherished memories from the wedding ceremony"
  },
  {
    id: 104,
    title: "Sundress Festival",
    category: "events",
    event: "Sundress Festival",
    src: "/images/optimized_1-2mb_DSCF7021_1751759471927.JPG",
    fullSrc: "/images/optimized_1-2mb_DSCF7021_1751759471927.JPG",
    description: ""
  },
  {
    id: 115,
    title: "Window Light",
    category: "models",
    src: "/photos/optimized_DSCF9272.jpg",
    fullSrc: "/photos/optimized_DSCF9272.jpg",
    description: "Graceful movement captured in natural window light with dramatic shadows and soft textures",
    tags: ["model", "portrait", "window-light", "movement", "grace", "shadows", "natural-light", "fashion"]
  },
  {
    id: 116,
    title: "Parkour Focus",
    category: "events",
    event: "Momentum Parkour",
    src: "/photos/optimized_DSCF1011-2-2.jpg",
    fullSrc: "/photos/optimized_DSCF1011-2-2.jpg",
    description: "Athlete in deep concentration during parkour training, capturing the mental preparation and focus required for the discipline",
    tags: ["parkour", "athlete", "concentration", "training", "focus", "sport", "preparation", "determination"]
  },
  {
    id: 117,
    title: "Holi Joy",
    category: "events",
    event: "Holi Festival",
    src: "/photos/optimized_DSCF0477_holi.jpg",
    fullSrc: "/photos/optimized_DSCF0477_holi.jpg",
    description: "Pure joy and celebration captured during Holi festival, with vibrant colors painting faces and clothes in the spirit of unity and happiness",
    tags: ["holi", "festival", "colors", "joy", "celebration", "portrait", "cultural", "happiness", "vibrant", "community"]
  },
  {
    id: 105,
    title: "Family Moment",
    category: "street",
    src: "/attached_assets/DSCF8179~3_1751759629727.JPG",
    fullSrc: "/attached_assets/DSCF8179~3_1751759629727.JPG",
    description: ""
  },
  {
    id: 106,
    title: "Film Photographer",
    category: "street",
    src: "/attached_assets/DSCF8174_1751759634084.JPG",
    fullSrc: "/attached_assets/DSCF8174_1751759634084.JPG",
    description: ""
  },
  {
    id: 107,
    title: "Improv",
    category: "events",
    event: "Improv",
    src: "/attached_assets/DSCF7642_1751759959912.JPG",
    fullSrc: "/attached_assets/DSCF7642_1751759959912.JPG",
    description: ""
  },
  {
    id: 108,
    title: "Sundress Festival",
    category: "events",
    event: "Sundress Festival",
    src: "/images/optimized_1-2mb_DSCF7032_1751760063471.JPG",
    fullSrc: "/images/optimized_1-2mb_DSCF7032_1751760063471.JPG",
    description: ""
  },
  {
    id: 113,
    title: "Vintage Elegance",
    category: "events",
    event: "Old Town Festival of Speed & Style",
    src: "/attached_assets/DSCF4006~2_1751761340063.JPG",
    fullSrc: "/attached_assets/DSCF4006~2_1751761340063.JPG",
    description: "",
    tags: ["vintage", "parasol", "fashion", "elegance", "festival", "style", "portrait", "classic"]
  },
  {
    id: 109,
    title: "Street Scene",
    category: "street",
    src: "/attached_assets/DSCF4497~2_1751760266934.JPG",
    fullSrc: "/attached_assets/DSCF4497~2_1751760266934.JPG",
    description: ""
  },
  {
    id: 110,
    title: "Wedding Bouquet",
    category: "wedding",
    src: "/images/optimized_1-2mb_DSCF5339_1751760681991.JPG",
    fullSrc: "/images/optimized_1-2mb_DSCF5339_1751760681991.JPG",
    description: ""
  },
  {
    id: 112,
    title: "Flower Girls",
    category: "wedding",
    src: "/images/optimized_1-2mb_DSCF5262_1751761264800.JPG",
    fullSrc: "/images/optimized_1-2mb_DSCF5262_1751761264800.JPG",
    description: "",
    tags: ["wedding", "flower-girls", "children", "bouquet", "dresses", "ceremony", "innocence", "joy"]
  }
];

export const interests = [
  "Computational Social Science",
  "Behavioral Biology",
  "Human Cognition & Behaviour",
  "Natural Language Processing",
  "Photography & Visual Arts"
];
