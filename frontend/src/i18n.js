import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      "home": "Accueil",
      "services": "Nos Services",
      "booking": "Réserver une consultation",
      "hero_title": "L'Excellence Financière pour votre Entreprise",
      "hero_subtitle": "Forts d'une expérience solide, nous vous accompagnons dans la comptabilité, la fiscalité et le développement de votre société.",
      "discover_services": "Découvrir nos services",
      "ai_greeting": "Bonjour ! Je suis l'assistant IA de la Fiduciaire BENHAMADI. Posez-moi vos questions !",
      "partner_title": "Votre Partenaire de Confiance",
      "partner_desc": "Bienvenue chez Fiduciaire BENHAMADI, votre partenaire de confiance pour tous vos besoins en matière de comptabilité, de fiscalité et de conseils financiers. Forts d'une expérience solide et d'une expertise approfondie, nous nous engageons à fournir des services de haute qualité et des solutions sur mesure pour répondre aux besoins uniques de chaque client. Notre cabinet se distingue par son engagement envers l'excellence, son approche personnalisée et son professionnalisme inégalé. En travaillant avec nous, vous bénéficierez de l'attention individualisée de notre équipe d'experts dévoués, composée de comptables, de fiscalistes et de conseillers financiers chevronnés. Contactez-nous pour un premier rendez-vous.",
      "contact_us": "Contactez-nous",
      "follow_us": "Suivez-nous",
      "address": "📍 Bur 122, 149 Av. Lalla Yacout, Casablanca, Maroc",
      "phone": "📞 Tél : 06 82 29 11 08",
      "email": "✉️ Email : mehdi123bts@gmail.com",
      "rights": "© 2026 Fiduciaire BENHAMADI. Tous droits réservés.",
      "expertise_title": "Nos Domaines d'Expertise",
      "expertise_desc": "Découvrez nos services professionnels adaptés à vos besoins.",
      "srv_compta_title": "Comptabilité & Bilan",
      "srv_compta_desc": "Tenue rigoureuse de votre comptabilité, déclarations et liasses fiscales.",
      "srv_creation_title": "Création d'Entreprise",
      "srv_creation_desc": "Accompagnement de A à Z pour lancer votre projet et choisir le bon statut juridique.",
      "srv_fisc_title": "Conseil Fiscal & Juridique",
      "srv_fisc_desc": "Optimisation de vos impôts et sécurisation de vos démarches juridiques.",
      "srv_bp_title": "Conception Business Plan",
      "srv_bp_desc": "Étude financière, prévisions et stratégie pour assurer le succès de vos projets.",
      "book_btn": "Prendre Rendez-vous",
      "booking_title": "Réservation de Consultation"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "services": "Our Services",
      "booking": "Book a Consultation",
      "hero_title": "Financial Excellence for Your Business",
      "hero_subtitle": "With solid experience, we support you in accounting, taxation, and the development of your company.",
      "discover_services": "Discover our services",
      "ai_greeting": "Hello! I am the AI assistant for Fiduciaire BENHAMADI. Ask me your questions!",
      "partner_title": "Your Trusted Partner",
      "partner_desc": "Fiduciaire BENHAMADI is an accounting and consulting firm based in Casablanca. Our mission is to provide business leaders with a clear vision of their financial situation, secure tax optimization, and customized support.",
      "contact_us": "Contact Us",
      "follow_us": "Follow Us",
      "address": "📍 Office 122, 149 Lalla Yacout Ave, Casablanca, Morocco",
      "phone": "📞 Phone: 06 82 29 11 08",
      "email": "✉️ Email: mehdi123bts@gmail.com",
      "rights": "© 2026 Fiduciaire BENHAMADI. All rights reserved.",
      "expertise_title": "Our Areas of Expertise",
      "expertise_desc": "Discover our professional services tailored to your needs.",
      "srv_compta_title": "Accounting & Balance Sheet",
      "srv_compta_desc": "Rigorous bookkeeping, declarations, and tax returns.",
      "srv_creation_title": "Company Creation",
      "srv_creation_desc": "A to Z support to launch your project and choose the right legal status.",
      "srv_fisc_title": "Tax & Legal Advice",
      "srv_fisc_desc": "Optimization of your taxes and securing your legal procedures.",
      "srv_bp_title": "Business Plan Design",
      "srv_bp_desc": "Financial study, forecasts, and strategy to ensure the success of your projects.",
      "book_btn": "Book an Appointment",
      "booking_title": "Consultation Booking"
    }
  },
  ar: {
    translation: {
      "home": "الرئيسية",
      "services": "خدماتنا",
      "booking": "حجز استشارة",
      "hero_title": "التميز المالي لشركتك",
      "hero_subtitle": "بخبرة قوية، ندعمك في المحاسبة والضرائب وتطوير شركتك.",
      "discover_services": "اكتشف خدماتنا",
      "ai_greeting": "مرحباً! أنا المساعد الذكي. اطرح أسئلتك!",
      "partner_title": "شريكك الموثوق",
      "partner_desc": "مؤسسة بنحمادي هي شركة محاسبة واستشارات مقرها في الدار البيضاء. مهمتنا هي تزويد قادة الأعمال برؤية واضحة لوضعهم المالي، وتحسين ضريبي آمن، ودعم مخصص.",
      "contact_us": "اتصل بنا",
      "follow_us": "تابعنا",
      "address": "📍 مكتب 122، 149 شارع لالة الياقوت، الدار البيضاء، المغرب",
      "phone": "📞 الهاتف: 06 82 29 11 08",
      "email": "✉️ البريد الإلكتروني: mehdi123bts@gmail.com",
      "rights": "© 2026 مؤسسة بنحمادي. جميع الحقوق محفوظة.",
      "expertise_title": "مجالات خبرتنا",
      "expertise_desc": "اكتشف خدماتنا المهنية المصممة لتلبية احتياجاتك.",
      "srv_compta_title": "المحاسبة والميزانية العمومية",
      "srv_compta_desc": "مسك الدفاتر بدقة، والإقرارات، والعوائد الضريبية.",
      "srv_creation_title": "إنشاء شركة",
      "srv_creation_desc": "دعم من الألف إلى الياء لإطلاق مشروعك واختيار الوضع القانوني المناسب.",
      "srv_fisc_title": "نصائح ضريبية وقانونية",
      "srv_fisc_desc": "تحسين ضرائبك وتأمين إجراءاتك القانونية.",
      "srv_bp_title": "تصميم خطة عمل",
      "srv_bp_desc": "دراسة مالية وتوقعات واستراتيجية لضمان نجاح مشاريعك.",
      "book_btn": "حجز موعد",
      "booking_title": "حجز استشارة"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
