'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import { MessageSquare, X, Send, ChevronRight, RefreshCw, Loader2 } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type ChatStep = 'WELCOME' | 'LANGUAGE_SELECTED' | 'SERVICE_SELECTION' | 'PROJECT_DETAILS' | 'CONTACT_INFO' | 'DONE';

interface ChatState {
    step: ChatStep;
    language: 'en' | 'ar';
    service: string | null;
    details: string;
    contact: string;
    messages: Message[];
}

interface Message {
    id: string;
    type: 'bot' | 'user';
    content: string | React.ReactNode;
    messageType?: 'welcome' | 'text'; // For special message types
}

const INITIAL_STATE: ChatState = {
    step: 'WELCOME',
    language: 'en',
    service: null,
    details: '',
    contact: '',
    messages: []
};

/* -------------------------------------------------------------------------- */
/*                                CONSTANTS                                   */
/* -------------------------------------------------------------------------- */

const TEXTS = {
    en: {
        welcome: "Hi there! 👋 I'm your virtual assistant. How can I help you today?",
        chooseLang: "Please choose your preferred language to continue.",
        servicePrompt: "Great choice! What kind of service are you looking for?",
        detailsPrompt: "Could you tell me a bit more about your project? Key features, timeline, or just a rough idea.",
        contactPrompt: "Almost done! Please provide your Email or Phone Number so we can get in touch.",
        success: "Perfect! Your request has been sent successfully. We will contact you shortly.",
        services: ["Frontend Development", "Backend Development", "UI/Design", "Graphic Design", "Custom Theme (Zid/Salla)", "Store Setup"],
        placeholderDetails: "e.g. I need a landing page for my startup...",
        placeholderContact: "e.g. name@example.com or +966...",
        send: "Send",
        restart: "New Chat",
        typing: "Typing..."
    },
    ar: {
        welcome: "مرحباً بك! 👋 أنا مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟",
        chooseLang: "الرجاء اختيار اللغة المفضلة للمتابعة.",
        servicePrompt: "اختيار رائع! ما هي الخدمة التي تبحث عنها؟",
        detailsPrompt: "ممكن تخبرني أكثر عن مشروعك؟ المميزات، الوقت المتوقع، أو مجرد فكرة عامة.",
        contactPrompt: "أوشكنا على الانتهاء! الرجاء تزويدي بالبريد الإلكتروني أو رقم الجوال للتواصل.",
        success: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً.",
        services: ["تطوير واجهات أمامية", "تطوير واجهات خلفية", "تصميم واجهات", "تصميم جرافيك", "ثيمات مخصصة (زيد/سلة)", "تجهيز متاجر"],
        placeholderDetails: "مثال: أحتاج صفحة هبوط لشركتي الناشئة...",
        placeholderContact: "مثال: name@example.com أو 05...",
        send: "إرسال",
        restart: "محادثة جديدة",
        typing: "يكتب..."
    }
};

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [state, setState] = useState<ChatState>(INITIAL_STATE);
    const [inputValue, setInputValue] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const chatButtonRef = useRef<HTMLButtonElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const t = TEXTS[state.language];

    // GSAP Animations
    useGSAP(() => {
        // Chat button pulse animation
        if (chatButtonRef.current && !isOpen) {
            gsap.to(chatButtonRef.current, {
                scale: 1.05,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }, { scope: chatButtonRef, dependencies: [isOpen] });

    // Animate chat window open/close
    useEffect(() => {
        if (chatWindowRef.current) {
            if (isOpen) {
                gsap.fromTo(chatWindowRef.current,
                    { 
                        opacity: 0, 
                        scale: 0.8, 
                        y: 20,
                        filter: 'blur(10px)'
                    },
                    { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 0.4,
                        ease: 'back.out(1.7)'
                    }
                );
                // Animate input container when it appears
                setTimeout(() => {
                    const inputContainer = chatWindowRef.current?.querySelector('.input-container');
                    if (inputContainer) {
                        gsap.fromTo(inputContainer,
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
                        );
                    }
                }, 100);
            } else {
                gsap.to(chatWindowRef.current, {
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        }
    }, [isOpen]);

    // Animate new messages
    useEffect(() => {
        if (messagesContainerRef.current && state.messages.length > 0) {
            const lastMessage = messagesContainerRef.current.lastElementChild as HTMLElement;
            if (lastMessage) {
                gsap.fromTo(lastMessage,
                    { 
                        opacity: 0, 
                        y: 20,
                        scale: 0.9,
                        filter: 'blur(5px)'
                    },
                    { 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        duration: 0.4,
                        ease: 'power3.out'
                    }
                );
            }
        }
    }, [state.messages.length]);

    // Animate service buttons
    useEffect(() => {
        if (state.step === 'SERVICE_SELECTION' && messagesContainerRef.current) {
            const serviceButtons = messagesContainerRef.current.querySelectorAll('.service-btn');
            if (serviceButtons.length > 0) {
                gsap.fromTo(serviceButtons,
                    { 
                        opacity: 0, 
                        y: 15,
                        scale: 0.95
                    },
                    { 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.out',
                        delay: 0.2
                    }
                );
            }
        }
    }, [state.step]);

    // Persist State
    useEffect(() => {
        const savedState = localStorage.getItem('chatState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                
                // Check if messages contain invalid JSX objects
                const hasInvalidMessages = parsed.messages?.some((msg: any) => {
                    // Check if content is an object (JSX element)
                    return msg.content && typeof msg.content === 'object' && !Array.isArray(msg.content);
                });
                
                if (hasInvalidMessages) {
                    // Clear invalid localStorage and start fresh
                    localStorage.removeItem('chatState');
                    setState(INITIAL_STATE);
                    setTimeout(() => {
                        addBotMessage('welcome', 'WELCOME');
                    }, 100);
                    return;
                }
                
                // Clean up messages - filter out any with invalid content (JSX objects)
                const cleanedMessages = parsed.messages?.filter((msg: Message) => {
                    // Only allow string content or welcome messageType
                    return typeof msg.content === 'string' || msg.messageType === 'welcome';
                }).map((msg: Message) => {
                    // Ensure content is string if not welcome
                    if (msg.messageType !== 'welcome' && typeof msg.content !== 'string') {
                        return { ...msg, content: String(msg.content) };
                    }
                    return msg;
                }) || [];
                
                setState({
                    ...parsed,
                    messages: cleanedMessages
                });
            } catch (e) {
                // If parsing fails, clear and start fresh
                localStorage.removeItem('chatState');
                setState(INITIAL_STATE);
                setTimeout(() => {
                    addBotMessage('welcome', 'WELCOME');
                }, 100);
            }
        } else {
            // Initial Welcome Message Logic if fresh
            setTimeout(() => {
                addBotMessage('welcome', 'WELCOME');
            }, 100);
        }
    }, []);

    useEffect(() => {
        // Only save valid state (no JSX elements)
        const validState = {
            ...state,
            messages: state.messages.map(msg => ({
                id: msg.id,
                type: msg.type,
                content: typeof msg.content === 'string' ? msg.content : '',
                messageType: msg.messageType
            }))
        };
        localStorage.setItem('chatState', JSON.stringify(validState));
        scrollToBottom();
    }, [state]);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Helper to add messages with typing delay
    const addBotMessage = (content: string | 'welcome', nextStep?: ChatStep) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            if (nextStep) setState(prev => ({ ...prev, step: nextStep }));

            const messageId = Date.now().toString();
            if (content === 'welcome') {
                setState(prev => ({
                    ...prev,
                    messages: [...prev.messages, { 
                        id: messageId, 
                        type: 'bot', 
                        content: '', 
                        messageType: 'welcome' 
                    }]
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    messages: [...prev.messages, { 
                        id: messageId, 
                        type: 'bot', 
                        content,
                        messageType: 'text'
                    }]
                }));
            }
        }, 800);
    };

    const addUserMessage = (text: string) => {
        setState(prev => ({
            ...prev,
            messages: [...prev.messages, { id: Date.now().toString(), type: 'user', content: text }]
        }));
    };

    const handleRestart = () => {
        localStorage.removeItem('chatState');
        setState(INITIAL_STATE);
        setInputValue('');
        setTimeout(() => {
            addBotMessage('welcome', 'WELCOME');
        }, 100);
    };

    const handleLanguageSelect = (lang: 'en' | 'ar') => {
        addUserMessage(lang === 'en' ? 'English' : 'العربية');

        // Update language immediately for subsequent messages
        const nextTexts = TEXTS[lang];

        setState(prev => ({ ...prev, language: lang }));

        setTimeout(() => {
            addBotMessage(nextTexts.servicePrompt, 'SERVICE_SELECTION');
        }, 500);
    };

    const handleServiceSelect = (service: string) => {
        addUserMessage(service);
        setState(prev => ({ ...prev, service }));
        addBotMessage(t.detailsPrompt, 'PROJECT_DETAILS');
    };

    // Validation helpers
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const isValidPhone = (phone: string): boolean => {
        const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
        const cleaned = phone.replace(/[\s-()]/g, '');
        return phoneRegex.test(cleaned) && cleaned.length >= 8 && cleaned.length <= 15;
    };

    const validateContact = (contact: string): boolean => {
        return isValidEmail(contact) || isValidPhone(contact);
    };

    const handleDetailsSubmit = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        
        // Validate minimum length
        if (trimmed.length < 10) {
            const errorMsg = state.language === 'ar' 
                ? 'الرجاء إدخال وصف المشروع (10 أحرف على الأقل)'
                : 'Please provide at least 10 characters for project details';
            addBotMessage(errorMsg, 'PROJECT_DETAILS');
            return;
        }

        addUserMessage(trimmed);
        setState(prev => ({ ...prev, details: trimmed }));
        setInputValue('');
        addBotMessage(t.contactPrompt, 'CONTACT_INFO');
    };

    const handleContactSubmit = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        // Validate contact info
        if (!validateContact(trimmed)) {
            const errorMsg = state.language === 'ar'
                ? 'الرجاء إدخال بريد إلكتروني صحيح أو رقم هاتف صحيح'
                : 'Please provide a valid email address or phone number';
            addBotMessage(errorMsg, 'CONTACT_INFO');
            return;
        }

        addUserMessage(trimmed);
        setIsSubmitting(true);

        try {
            // Determine contact type
            const contactType = isValidEmail(trimmed) ? 'Email' : 'Phone';
            
            // Prepare EmailJS template parameters
            const templateParams = {
                language: state.language === 'ar' ? 'Arabic' : 'English',
                service: state.service || '',
                details: state.details || '',
                contact: trimmed,
                contact_type: contactType,
            };

            // Send email using EmailJS
            await emailjs.send(
                'service_pycouza', // Your EmailJS service ID
                'template_oc2aavk', // Your EmailJS template ID
                templateParams,
                'Bb6mNSVsbyMC0KQOx' // Your EmailJS public key
            );

            setState(prev => ({ ...prev, contact: trimmed, step: 'DONE' }));
            addBotMessage(t.success, 'DONE');
        } catch (error: any) {
            console.error('EmailJS Error:', error);
            
            // Better error messages
            let errorMsg = state.language === 'ar'
                ? 'حدث خطأ. الرجاء المحاولة مرة أخرى.'
                : 'Something went wrong. Please try again.';
            
            if (error?.status === 412) {
                errorMsg = state.language === 'ar'
                    ? 'يرجى إعادة الاتصال بحساب Gmail في EmailJS'
                    : 'Please reconnect your Gmail account in EmailJS dashboard';
            }
            
            addBotMessage(errorMsg, 'CONTACT_INFO');
        } finally {
            setIsSubmitting(false);
            setInputValue('');
        }
    };

    /* ------------------------------ RENDER HELPERS ----------------------------- */

    const WelcomeMessage = () => (
        <div className="flex flex-col gap-2">
            <p>{TEXTS.en.welcome}</p>
            <p className="text-right font-['Tajawal']" dir="rtl">{TEXTS.ar.welcome}</p>
            <div className="h-px bg-slate-700/50 my-2" />
            <p className="text-sm text-slate-400">{TEXTS.en.chooseLang}</p>
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => handleLanguageSelect('en')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-sm transition-colors"
                >
                    English
                </button>
                <button
                    onClick={() => handleLanguageSelect('ar')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white text-sm font-['Tajawal'] transition-colors"
                >
                    العربية
                </button>
            </div>
        </div>
    );

    const ServiceOptions = () => (
        <div className="grid grid-cols-2 gap-2 mt-2">
            {t.services.map((srv, idx) => (
                <button
                    key={idx}
                    onClick={() => handleServiceSelect(srv)}
                    className="service-btn p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-left transition-all hover:scale-105 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20"
                    onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                            scale: 1.05,
                            duration: 0.2,
                            ease: 'power2.out'
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                            scale: 1,
                            duration: 0.2,
                            ease: 'power2.out'
                        });
                    }}
                >
                    {srv}
                </button>
            ))}
        </div>
    );

    /* ----------------------------------- UI ----------------------------------- */

    return (
        <div className={`fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 font-['Inter'] ${state.language === 'ar' ? 'font-[\'Tajawal\']' : ''}`}>

            <AnimatePresence>
                {isOpen && (
                    <div
                        ref={chatWindowRef}
                        className="w-[350px] md:w-[400px] bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isSubmitting ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
                                <span className="font-semibold">Assistant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleRestart}
                                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                                    title={t.restart}
                                >
                                    <RefreshCw size={16} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div 
                            ref={messagesContainerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f172a] scrollbar-thin scrollbar-thumb-slate-700"
                        >
                            {state.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`message-item flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                                ? 'bg-indigo-600 text-white rounded-tr-none'
                                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                                            }`}
                                    >
                                        {msg.messageType === 'welcome' ? (
                                            <WelcomeMessage />
                                        ) : (
                                            typeof msg.content === 'string' ? msg.content : String(msg.content || '')
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start typing-indicator">
                                    <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}

                            {state.step === 'SERVICE_SELECTION' && !isTyping && state.messages[state.messages.length - 1].type === 'bot' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <ServiceOptions />
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        {(state.step === 'PROJECT_DETAILS' || state.step === 'CONTACT_INFO') && (
                            <div className="p-3 bg-slate-900 border-t border-slate-800 input-container">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (state.step === 'PROJECT_DETAILS' ? handleDetailsSubmit() : handleContactSubmit())}
                                        onFocus={(e) => {
                                            gsap.to(e.currentTarget, {
                                                scale: 1.02,
                                                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }}
                                        onBlur={(e) => {
                                            gsap.to(e.currentTarget, {
                                                scale: 1,
                                                boxShadow: '0 0 0px rgba(99, 102, 241, 0)',
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }}
                                        placeholder={state.step === 'PROJECT_DETAILS' ? t.placeholderDetails : t.placeholderContact}
                                        disabled={isSubmitting || isTyping}
                                        className="w-full bg-slate-800 text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder:text-slate-500 text-sm transition-all"
                                    />
                                    <button
                                        onClick={state.step === 'PROJECT_DETAILS' ? handleDetailsSubmit : handleContactSubmit}
                                        disabled={!inputValue.trim() || isSubmitting}
                                        className="absolute right-2 p-1.5 bg-indigo-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors"
                                        onMouseEnter={(e) => {
                                            if (!e.currentTarget.disabled) {
                                                gsap.to(e.currentTarget, {
                                                    scale: 1.1,
                                                    rotation: 5,
                                                    duration: 0.2,
                                                    ease: 'power2.out'
                                                });
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            gsap.to(e.currentTarget, {
                                                scale: 1,
                                                rotation: 0,
                                                duration: 0.2,
                                                ease: 'power2.out'
                                            });
                                        }}
                                    >
                                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {state.step === 'DONE' && (
                            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
                                <button
                                    onClick={handleRestart}
                                    className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:scale-105"
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                                    }}
                                >
                                    {t.restart}
                                </button>
                            </div>
                        )}

                    </div>
                )}
            </AnimatePresence>

            <button
                ref={chatButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex items-center justify-center w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all"
                onMouseEnter={() => {
                    if (chatButtonRef.current) {
                        gsap.to(chatButtonRef.current, {
                            scale: 1.1,
                            boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                }}
                onMouseLeave={() => {
                    if (chatButtonRef.current) {
                        gsap.to(chatButtonRef.current, {
                            scale: isOpen ? 1 : 1.05,
                            boxShadow: '0 0 0px rgba(99, 102, 241, 0)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                }}
            >
                <AnimatePresence mode='wait'>
                    {isOpen ? (
                        <motion.div 
                            key="close" 
                            initial={{ rotate: -90, opacity: 0 }} 
                            animate={{ rotate: 0, opacity: 1 }} 
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="open" 
                            initial={{ rotate: 90, opacity: 0 }} 
                            animate={{ rotate: 0, opacity: 1 }} 
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageSquare size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse Effect with GSAP */}
                {!isOpen && (
                    <span 
                        className="absolute inset-0 rounded-full border-2 border-indigo-400"
                        style={{ opacity: 0 }}
                    />
                )}
            </button>
        </div>
    );
}
