import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: t('ai_greeting') }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const [currentPage, setCurrentPage] = useState('home');

  const [formData, setFormData] = useState({
      clientName: '', clientEmail: '', clientPhone: '', appointmentDate: '', appointmentTime: ''
  });
  const [bookingStatus, setBookingStatus] = useState('');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // On met à jour le message de bienvenue si la langue change
    setMessages([{ role: 'ai', text: i18n.t('ai_greeting', { lng }) }]);
  };

  const handleFormChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const submitBooking = async (e) => {
      e.preventDefault();
      setBookingStatus('Envoi en cours...');
      
      try {
          const response = await fetch('http://localhost:8080/api/appointments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          });
          
          if (response.ok) {
              setBookingStatus('succès');
              setFormData({ clientName: '', clientEmail: '', clientPhone: '', appointmentDate: '', appointmentTime: '', serviceType: ''});
          } else {
              setBookingStatus('Erreur lors de l\'envoi.');
          }
      } catch (error) {
          console.error("Erreur d'envoi", error);
          setBookingStatus('Erreur de connexion au serveur.');
      }
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "VOTRE_CLE_GEMINI_ICI";

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setInputValue('');

    // Si la clé n'est pas configurée
    if (GEMINI_API_KEY === "VOTRE_CLE_API_ICI") {
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'ai', text: "Le cerveau de l'IA (LLM) est prêt ! Il ne reste plus qu'à insérer la clé API dans le code pour que je puisse vous répondre." }]);
        }, 1000);
        return;
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userText }]
                }],
                systemInstruction: {
                    parts: [{ text: "Tu es l'assistant virtuel IA de la Fiduciaire BENHAMADI à Casablanca. L'adresse du cabinet est au Boulevard Lalla Yakout. Tu réponds aux questions sur la comptabilité, création d'entreprise et fiscalité. Va droit au but, sois très professionnel. NE DIS PAS 'Bonjour' à chaque fois, réponds directement à la question de manière concise. Si on te demande un prix ou tarif, refuse poliment de donner un prix et dis que c'est sur devis, puis invite toujours le client à prendre rendez-vous en cliquant sur le bouton orange 'RESERVER UNE CONSULTATION'." }]
                }
            })
        });

        const data = await response.json();
        
        if (data.error || (!data.candidates || data.candidates.length === 0)) {
            // FALLBACK SILENCIEUX SI L'API EST SATURÉE (High demand)
            simulateFallbackAI(userText, i18n.language);
        } else {
            const aiText = data.candidates[0].content.parts[0].text.replace(/\*\*/g, '');
            setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
        }
    } catch (error) {
        console.error("Erreur API:", error);
        // FALLBACK EN CAS D'ERREUR RÉSEAU
        simulateFallbackAI(userText, i18n.language);
    }
  };

  // LOGIQUE DE SECOURS (Si Google est saturé, l'utilisateur ne s'en rendra pas compte)
  const simulateFallbackAI = (text, lang) => {
      let aiResponse = "";
      const lowerInput = text.toLowerCase();
      
      // On vérifie les questions importantes EN PREMIER (même s'ils disent bonjour)
      if (lowerInput.includes('prix') || lowerInput.includes('tarif') || lowerInput.includes('dhs') || lowerInput.includes('combien')) {
          aiResponse = lang === 'en' ? "For pricing information, please book an appointment with the cabinet." :
                       lang === 'ar' ? "للحصول على معلومات الأسعار، يرجى حجز موعد مع المكتب." :
                       "Pour toute information concernant nos tarifs, je vous invite à prendre un rendez-vous directement avec le cabinet.";
      } else if (lowerInput.includes('trouve') || lowerInput.includes('adresse') || lowerInput.includes('où')) {
          aiResponse = "Le cabinet Fiduciaire BENHAMADI se trouve au Boulevard Lalla Yakout, à Casablanca.";
      } else if (lowerInput.includes('création') || lowerInput.includes('société')) {
          aiResponse = "Nous prenons en charge tout le processus de création d'entreprise (rédaction des statuts, registre du commerce, etc.). Souhaitez-vous planifier une consultation ?";
      } else if (lowerInput.includes('bonjour') || lowerInput.includes('salut') || lowerInput.includes('hello')) {
          aiResponse = "Comment puis-je vous assister aujourd'hui ?";
      } else {
          aiResponse = "Je comprends votre demande. En tant qu'Intelligence Artificielle, je vous recommande de prendre un rendez-vous avec le cabinet pour que nos experts analysent précisément votre situation.";
      }
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <>
      {/* 3-TIER HEADER */}
      <div className="top-bar">
          <div className="top-bar-left">
              <span>🕒 Lun - Ven: 09h - 18h | Sam: 09h - 12h</span>
          </div>
          <div className="top-bar-right">
              <button className="devis-btn" onClick={() => setCurrentPage('booking')}>{t('booking')}</button>
          </div>
      </div>

      <div className="middle-header">
          <div className="logo" style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'}} onClick={() => setCurrentPage('home')}>
              <img src="/logo.png" alt="Logo Fiduciaire" style={{height: '60px', borderRadius: '8px'}} />
              <div style={{fontSize: '1.8rem', fontWeight: 800, color: '#0f172a'}}>Fiduciaire <span style={{color: '#d97706'}}>BENHAMADI</span></div>
          </div>
      </div>

      <nav className="bottom-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>{t('home')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); }}>{t('services')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Contact</a>
          <div style={{display: 'flex', alignItems: 'center'}}>
              <select 
                  className="lang-select"
                  value={i18n.language} 
                  onChange={(e) => changeLanguage(e.target.value)}
              >
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                  <option value="ar">AR</option>
              </select>
          </div>
      </nav>

      {/* ---------------- PAGE D'ACCUEIL ---------------- */}
      {currentPage === 'home' && (
          <>
              <header className="hero">
                  <div className="hero-content">
                      <h1>{t('hero_title')}</h1>
                      <p>{t('hero_subtitle')}</p>
                      <div className="hero-buttons">
                          <button className="btn-primary large" onClick={() => setCurrentPage('services')}>{t('discover_services')}</button>
                      </div>
                  </div>
              </header>

              <section style={{padding: '5rem 10%', background: 'white', textAlign: 'center'}}>
                  <h2 style={{color: '#0f172a', fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 800}}>{t('partner_title')}</h2>
                  <p style={{fontSize: '1.15rem', color: '#334155', maxWidth: '900px', margin: '0 auto', lineHeight: '2', textAlign: 'justify', fontWeight: 500}}>
                      {t('partner_desc')}
                  </p>
              </section>
          </>
      )}

      {/* CARTE GOOGLE MAPS & FOOTER - PAGE CONTACT UNIQUEMENT */}
      {currentPage === 'contact' && (
          <>
              <section id="contact-map" style={{padding: '5rem 5%', background: '#f8fafc', color: '#0f172a'}}>
                  <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
                      <h2 style={{fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 800}}>Contactez-nous</h2>
                      {/* Google Maps Interactive */}
                      <div style={{width: '100%', minHeight: '400px'}}>
                          <iframe 
                              src="https://maps.google.com/maps?q=149%20Av.%20Lalla%20Yacout,%20Casablanca&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                              width="100%" 
                              height="100%" 
                              style={{border: 0, borderRadius: '12px', minHeight: '400px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                              allowFullScreen 
                              loading="lazy">
                          </iframe>
                      </div>
                  </div>
              </section>

              {/* FOOTER */}
              <footer id="contact" style={{
                  backgroundColor: '#0f172a', color: 'white', padding: '4rem 5% 2rem'
              }}>
                  <div style={{
                      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem'
                  }}>
                      <div>
                          <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800'}}>Fiduciaire <span style={{color: '#d97706'}}>BENHAMADI</span></h3>
                          <p style={{opacity: '0.8', marginBottom: '0.8rem'}}>Votre partenaire de confiance pour la comptabilité, la fiscalité et le conseil d'entreprise à Casablanca.</p>
                      </div>
                      <div>
                          <h4 style={{fontSize: '1.2rem', marginBottom: '1.5rem', color: '#d97706'}}>{t('contact_us')}</h4>
                          <p style={{opacity: '0.8', marginBottom: '0.8rem'}}>{t('address')}</p>
                          <p style={{opacity: '0.8', marginBottom: '0.8rem'}}>{t('phone')}</p>
                          <p style={{opacity: '0.8', marginBottom: '0.8rem'}}>{t('email')}</p>
                      </div>
                  </div>
                  <div style={{textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: '0.7', fontSize: '0.9rem'}}>
                      <p>{t('rights')}</p>
                  </div>
              </footer>
          </>
      )}
      {currentPage === 'services' && (
          <section id="services" className="photo-services">
              <div className="section-header">
                  <h2>{t('expertise_title')}</h2>
                  <p>{t('expertise_desc')}</p>
              </div>
              <div className="photo-grid">
                  <div className="photo-card" style={{cursor: 'pointer'}} onClick={() => setCurrentPage('booking')}>
                      <img src="/service_compta.png" alt="Comptabilité" />
                      <div className="photo-card-content">
                          <h3>{t('srv_compta_title')}</h3>
                          <p>{t('srv_compta_desc')}</p>
                          <button style={{marginTop: '1rem', background: '#0f172a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', width: '100%'}}>{t('book_btn')}</button>
                      </div>
                  </div>
                  
                  <div className="photo-card" style={{cursor: 'pointer'}} onClick={() => setCurrentPage('booking')}>
                      <img src="/service_creation.png" alt="Création d'entreprise" />
                      <div className="photo-card-content">
                          <h3>{t('srv_creation_title')}</h3>
                          <p>{t('srv_creation_desc')}</p>
                          <button style={{marginTop: '1rem', background: '#0f172a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', width: '100%'}}>{t('book_btn')}</button>
                      </div>
                  </div>

                  <div className="photo-card" style={{cursor: 'pointer'}} onClick={() => setCurrentPage('booking')}>
                      <img src="/service_fiscalite.png" alt="Fiscalité" />
                      <div className="photo-card-content">
                          <h3>{t('srv_fisc_title')}</h3>
                          <p>{t('srv_fisc_desc')}</p>
                          <button style={{marginTop: '1rem', background: '#0f172a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', width: '100%'}}>{t('book_btn')}</button>
                      </div>
                  </div>

                  <div className="photo-card" style={{cursor: 'pointer'}} onClick={() => setCurrentPage('booking')}>
                      <img src="/service_business_plan.png" alt="Business Plan" />
                      <div className="photo-card-content">
                          <h3>{t('srv_bp_title')}</h3>
                          <p>{t('srv_bp_desc')}</p>
                          <button style={{marginTop: '1rem', background: '#0f172a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', width: '100%'}}>{t('book_btn')}</button>
                      </div>
                  </div>
              </div>
          </section>
      )}

      {/* ---------------- PAGE DE RÉSERVATION ---------------- */}
      {currentPage === 'booking' && (
          <div className="booking-page-container" style={{padding: '4rem 10%', background: '#f8fafc', minHeight: '80vh'}}>
              <div style={{background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto'}}>
                  <h2 style={{color: '#0f172a', marginBottom: '1rem', fontSize: '2rem'}}>{t('booking_title')}</h2>
                  <p className="price-tag" style={{display: 'inline-block', backgroundColor: '#fef3c7', color: '#d97706', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: '800', marginBottom: '2rem'}}>Tarif : 300 DHS</p>
                  
                  {bookingStatus === 'succès' ? (
                      <div style={{background: '#22c55e', color: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center'}}>
                          <h3>✅ Demande Envoyée avec Succès !</h3>
                          <button onClick={() => setBookingStatus('')} style={{marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer', background: 'white', color: '#22c55e', fontWeight: 'bold'}}>Faire une autre demande</button>
                      </div>
                  ) : (
                      <form onSubmit={submitBooking} style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
                          <div>
                              <label style={{fontWeight: 'bold'}}>Service souhaité</label>
                              <select name="serviceType" value={formData.serviceType} onChange={handleFormChange} required style={{width: '100%', padding:'1rem', borderRadius:'8px', border:'1px solid #ccc', marginTop: '0.5rem', background: 'white'}}>
                                  <option value="">Sélectionnez un service...</option>
                                  <option value="Comptabilité & Bilan">Comptabilité & Bilan</option>
                                  <option value="Création d'Entreprise">Création d'Entreprise</option>
                                  <option value="Conseil Fiscal & Juridique">Conseil Fiscal & Juridique</option>
                                  <option value="Conception Business Plan">Conception Business Plan</option>
                                  <option value="Autre / Conseil général">Autre / Conseil général</option>
                              </select>
                          </div>
                          <div>
                              <label style={{fontWeight: 'bold'}}>Nom Complet / Société</label>
                              <input type="text" name="clientName" value={formData.clientName} onChange={handleFormChange} required style={{width: '100%', padding:'1rem', borderRadius:'8px', border:'1px solid #ccc', marginTop: '0.5rem'}}/>
                          </div>
                          <div>
                              <label style={{fontWeight: 'bold'}}>Votre Email</label>
                              <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleFormChange} required style={{width: '100%', padding:'1rem', borderRadius:'8px', border:'1px solid #ccc', marginTop: '0.5rem'}}/>
                          </div>
                          <div>
                              <label style={{fontWeight: 'bold'}}>Votre Téléphone</label>
                              <input type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleFormChange} required style={{width: '100%', padding:'1rem', borderRadius:'8px', border:'1px solid #ccc', marginTop: '0.5rem'}}/>
                          </div>
                          <div>
                              <label style={{fontWeight: 'bold'}}>Date souhaitée</label>
                              <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleFormChange} required style={{width: '100%', padding:'1rem', borderRadius:'8px', border:'1px solid #ccc', marginTop: '0.5rem', background: 'white'}}/>
                          </div>
                          <div>
                              <label style={{fontWeight: 'bold'}}>Heure souhaitée</label>
                              <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleFormChange} required style={{width: '100%', padding:'1rem', borderRadius:'8px', border:'1px solid #ccc', marginTop: '0.5rem', background: 'white'}}/>
                          </div>
                          <button type="submit" className="btn-primary" style={{padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem'}}>
                              {bookingStatus === 'Envoi en cours...' ? 'Traitement...' : 'Valider la demande de rendez-vous'}
                          </button>
                      </form>
                  )}
              </div>
          </div>
      )}

      {/* ---------------- CHATBOT IA ---------------- */}
      {currentPage === 'home' && (
          <div className="chatbot-bubble" onClick={toggleChat}>🤖</div>
      )}

      {isChatOpen && currentPage === 'home' && (
        <div className="chatbot-window">
          <div className="chat-header">
            <span>Assistant IA</span>
            <span className="close-chat" onClick={toggleChat}>&times;</span>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role === 'ai' ? 'message-ai' : 'message-user'}`}>
                    {msg.text}
                </div>
            ))}
          </div>
          <form className="chat-input-container" onSubmit={sendMessage}>
            <input type="text" className="chat-input" placeholder="Écrivez votre message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="chat-send">➤</button>
          </form>
        </div>
      )}
      
      {/* ---------------- BARRE DE CONTACT FLOTTANTE (LOGO SEULEMENT) ---------------- */}
      <div className="floating-action-bar" style={{position: 'fixed', bottom: '20px', left: '20px', width: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', zIndex: 9999, height: 'auto'}}>
          <a href="tel:0682291108" className="action-btn call-btn" style={{width: '60px', height: '60px', borderRadius: '50%', padding: '0', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          <a href="https://wa.me/212682291108" target="_blank" rel="noreferrer" className="action-btn whatsapp-btn" style={{width: '60px', height: '60px', borderRadius: '50%', padding: '0', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M12.031 21.493l-4.12 1.08 1.095-4.015A9.957 9.957 0 0 1 2.016 12C2.016 6.477 6.49 2 12.015 2c5.526 0 10.001 4.477 10.001 10s-4.475 10-10.001 10c-1.745 0-3.385-.45-4.832-1.246L12.03 21.493zm-3.04-3.565c1.173.7 2.535 1.107 3.992 1.107 4.422 0 8.015-3.593 8.015-8.016 0-4.423-3.593-8.016-8.015-8.016-4.423 0-8.016 3.593-8.016 8.016 0 1.554.444 2.998 1.205 4.223l-.707 2.593 2.658-.696c.205-.054.408-.025.597.086l.27.103zM9.467 8.35c-.17-.4-.36-.407-.52-.416-.134-.007-.285-.008-.44-.008s-.404.057-.614.286c-.21.228-.802.784-.802 1.912s.823 2.217.936 2.37c.114.152 1.618 2.47 3.918 3.465 1.902.822 2.345.748 2.766.626.54-.158 1.346-.55 1.536-1.084.19-.533.19-.99.133-1.084-.057-.095-.21-.152-.44-.266-.23-.114-1.346-.665-1.554-.741-.21-.076-.36-.114-.512.114-.153.228-.59.742-.722.894-.132.152-.266.17-.496.057-.23-.114-.96-.354-1.83-1.13-.675-.603-1.13-1.347-1.264-1.575-.133-.228-.014-.35.1-.465.103-.102.23-.266.345-.4.114-.132.152-.228.23-.38.075-.152.038-.285-.02-.4-.056-.114-.512-1.235-.7-1.692z"/></svg>
          </a>
      </div>
    </>
  );
}

export default App;
