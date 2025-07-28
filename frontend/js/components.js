// Utility functions
function updatePageTitle(title) {
    document.title = title;
}

function updateMetaDescription(description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', description);
    }
}

function formatDate() {
    return new Date().getFullYear();
}

// Component rendering functions
function renderHomePage(data) {
    updatePageTitle(data.meta.title);
    updateMetaDescription(data.meta.description);
    
    return `
        <main class="bg-gray-50 min-h-screen font-sans">
            <!-- Logo -->
            <div class="flex justify-center items-center gap-4 pt-10 pb-4 bg-background">
                <img src="http://localhost:8000/static/bmg-logo.png" alt="Boston Manufacturing Group logo" class="h-20 w-auto" />
                <a href="https://www.linkedin.com/company/boston-manufacturing-group/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="ml-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="6" fill="#0077B5"/>
                        <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
                    </svg>
                </a>
            </div>
            
            <!-- Hero Section with Video Background -->
            <section class="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
                <video
                    autoplay
                    loop
                    muted
                    playsinline
                    class="absolute inset-0 w-full h-full object-cover z-0"
                    src="${data.hero.video}"
                ></video>
                <div class="relative z-10 w-full flex flex-col items-center justify-center h-full bg-secondary/60 text-white px-4 text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-4">${data.hero.title}</h1>
                    <p class="text-xl md:text-2xl max-w-2xl mx-auto mb-6">${data.hero.subtitle}</p>
                    <div class="flex flex-col md:flex-row justify-center gap-4 mt-4">
                        <a href="#contact" class="inline-block bg-primary text-white font-semibold px-8 py-3 rounded shadow hover:bg-secondary transition">Contact Us</a>
                        <a href="/reports" class="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded shadow hover:bg-primary transition">View Reports</a>
                        <a href="/sourcing" class="inline-block bg-accent text-white font-semibold px-8 py-3 rounded shadow hover:bg-primary transition">Sourcing</a>
                        <a href="/about" class="inline-block bg-primary text-white font-semibold px-8 py-3 rounded shadow hover:bg-secondary transition">About</a>
                    </div>
                </div>
            </section>

            <!-- Services -->
            <section class="py-16 px-4 max-w-5xl mx-auto" id="services">
                <h2 class="text-3xl font-bold text-center mb-10 text-blue-900">Our Services</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    ${data.services.map(service => `
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-xl font-semibold mb-2 text-blue-800">${service.title}</h3>
                            <p>${service.description}</p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Sourcing Capabilities -->
            <section class="py-16 px-4 bg-white border-t border-b">
                <h2 class="text-3xl font-bold text-center mb-10 text-blue-900">Sourcing Capabilities</h2>
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div>
                        <h4 class="font-semibold text-blue-800 mb-2">Electronics</h4>
                        <ul class="list-disc list-inside text-gray-700">
                            ${data.capabilities.electronics.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-blue-800 mb-2">Metals & Plastics</h4>
                        <ul class="list-disc list-inside text-gray-700">
                            ${data.capabilities.metals_plastics.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-blue-800 mb-2">Motors, Batteries, Assemblies</h4>
                        <ul class="list-disc list-inside text-gray-700">
                            ${data.capabilities.motors_batteries.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Five Phase Process -->
            <section class="py-16 px-4 max-w-5xl mx-auto" id="process">
                <h2 class="text-3xl font-bold text-center mb-10 text-blue-900">Our Five Phase Approach</h2>
                <ol class="space-y-6 text-lg">
                    ${data.process.map((phase, index) => `
                        <li><span class="font-semibold text-blue-800">${index + 1}. ${phase.split(':')[0]}:</span> ${phase.split(':')[1]}</li>
                    `).join('')}
                </ol>
            </section>

            <!-- Team -->
            <section class="py-16 px-4 bg-white border-t border-b" id="team">
                <h2 class="text-3xl font-bold text-center mb-10 text-blue-900">Meet the Team</h2>
                <div class="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
                    ${data.team.map(member => `
                        <div class="flex-1 bg-gray-100 rounded-lg p-6 shadow flex flex-col items-center">
                            <img src="http://localhost:8000${member.image}" alt="${member.name} portrait" class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200" />
                            <h3 class="text-xl font-semibold text-blue-800 mb-2">${member.name}</h3>
                            <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${member.name} LinkedIn" class="mb-2">
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="32" height="32" rx="6" fill="#0077B5"/>
                                    <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
                                </svg>
                            </a>
                            <p class="mb-2">${member.title}</p>
                            <p>${member.bio}</p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Testimonials -->
            <section class="py-16 px-4 max-w-5xl mx-auto" id="testimonials">
                <h2 class="text-3xl font-bold text-center mb-10 text-blue-900">What People Say</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    ${data.testimonials.map(testimonial => `
                        <div class="bg-white rounded-lg shadow p-6">
                            <p class="italic mb-4">"${testimonial.quote}"</p>
                            <p class="font-semibold text-blue-800">${testimonial.author}</p>
                            <p class="text-gray-600">${testimonial.title}</p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Contact -->
            <section class="py-16 px-4 bg-blue-900 text-white" id="contact">
                <h2 class="text-3xl font-bold text-center mb-6">Let's Connect</h2>
                <div class="max-w-xl mx-auto text-center">
                    <p class="mb-4">Ready to take your idea to production? Contact us today.</p>
                    <p class="mb-2 font-semibold">Email: <a href="mailto:${data.contact.email}" class="underline">${data.contact.email}</a></p>
                    <p class="mb-2 font-semibold">Phone: <a href="tel:${data.contact.phone.replace(/[^\d]/g, '')}" class="underline">${data.contact.phone}</a></p>
                    <p class="text-sm mt-6">© ${formatDate()} Boston Manufacturing Group</p>
                </div>
            </section>
        </main>
    `;
}

function renderAboutPage(data) {
    updatePageTitle(data.meta.title);
    
    return `
        <main class="bg-background min-h-screen font-sans">
            <div class="flex justify-center pt-10 pb-4 bg-background">
                <a href="/">
                    <img src="http://localhost:8000/static/bmg-logo.png" alt="Boston Manufacturing Group logo" class="h-16 w-auto cursor-pointer" />
                </a>
            </div>
            <section class="max-w-4xl mx-auto py-12 px-4">
                <h1 class="text-4xl font-bold text-secondary mb-6 text-center">${data.title}</h1>
                <p class="text-lg text-accent mb-8 text-center">
                    ${data.description}
                </p>

                <div class="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-primary">
                    <h2 class="text-2xl font-semibold text-primary mb-6 text-center">The BMG Five Phase Approach</h2>
                    <ol class="list-decimal list-inside text-gray-700 space-y-6">
                        ${data.five_phase_approach.map(phase => `
                            <li>
                                <span class="font-bold text-secondary">${phase.phase}:</span> ${phase.description}
                            </li>
                        `).join('')}
                    </ol>
                    <div class="mt-8 text-center">
                        <span class="inline-block bg-primary text-white px-4 py-2 rounded font-semibold">Why the Five Phase Approach Works</span>
                        <ul class="list-disc list-inside text-gray-700 mt-4 text-left max-w-2xl mx-auto">
                            <li><b>Holistic Assessment:</b> We look at both technical and business needs, ensuring solutions are practical and impactful.</li>
                            <li><b>Expert-Led:</b> Our process is led by industry veterans and academic leaders in manufacturing and quality control.</li>
                            <li><b>Proven Results:</b> This approach has powered the successful delivery of millions of premium-quality products and realized cumulative savings exceeding hundreds of millions of dollars for manufacturing plants around the globe.</li>
                        </ul>
                    </div>
                </div>

                <div class="bg-secondary/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-secondary">
                    <h2 class="text-2xl font-semibold text-secondary mb-4">Leadership</h2>
                    <div class="flex flex-col md:flex-row gap-8 items-center justify-center">
                        ${data.team.map(member => `
                            <div class="flex flex-col items-center">
                                <img src="http://localhost:8000${member.image}" alt="${member.name} portrait" class="w-24 h-24 rounded-full object-cover border-2 border-secondary mb-2" />
                                <div class="font-bold text-primary">${member.name}</div>
                                <div class="text-accent mb-2">${member.title}</div>
                                <p class="text-gray-700 text-center text-sm">${member.bio.substring(0, 200)}...</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="bg-primary/10 rounded-xl p-6 text-center mb-8 shadow-lg border-l-8 border-primary">
                    <h3 class="text-xl font-bold mb-2">Contact Us</h3>
                    <p class="mb-2">Email: <a href="mailto:${data.contact.email}" class="underline text-primary">${data.contact.email}</a></p>
                    <p class="mb-2">Phone: <a href="tel:${data.contact.phone.replace(/[^\d]/g, '')}" class="underline text-primary">${data.contact.phone}</a></p>
                </div>
            </section>
            <div class="flex justify-center pb-12">
                <a href="/" class="mt-8 inline-block bg-primary text-white font-semibold px-6 py-3 rounded shadow hover:bg-secondary transition">Back to Home</a>
            </div>
        </main>
    `;
}

function renderSourcingPage(data) {
    updatePageTitle(data.meta.title);
    
    return `
        <main class="bg-background min-h-screen font-sans">
            <div class="flex justify-center pt-10 pb-4 bg-background">
                <a href="/">
                    <img src="http://localhost:8000/static/bmg-logo.png" alt="Boston Manufacturing Group logo" class="h-16 w-auto cursor-pointer" />
                </a>
            </div>
            <section class="max-w-4xl mx-auto py-12 px-4">
                <h1 class="text-4xl font-bold text-secondary mb-6 text-center">${data.title}</h1>
                <p class="text-lg text-accent mb-8 text-center">
                    ${data.description}
                </p>

                <!-- Global Sourcing Network Section -->
                <div class="bg-accent/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-accent">
                    <h2 class="text-2xl font-semibold text-accent mb-6 flex items-center gap-2">
                        <span>${data.global_reach.title}</span>
                        <span class="text-xl">🌍</span>
                    </h2>
                    <p class="text-gray-700 mb-8 text-center">${data.global_reach.subtitle}</p>
                    
                    <!-- World Map SVG -->
                    <div class="bg-white rounded-lg p-6 mb-6 shadow-inner">
                        <svg viewBox="0 0 1000 500" class="w-full h-auto max-h-96">
                            <!-- Ocean Background -->
                            <rect width="1000" height="500" fill="#bfdbfe"/>
                            
                            <!-- Accurate World Map Continents -->
                            <!-- North America -->
                            <path d="M 50 150 Q 80 120 120 125 L 140 110 Q 180 100 220 120 L 250 110 Q 280 115 300 140 L 320 160 Q 330 180 325 200 L 320 220 Q 315 240 300 250 L 280 270 Q 250 280 220 275 L 200 280 Q 180 285 160 275 L 140 265 Q 120 250 110 230 L 100 210 Q 90 190 85 170 L 80 150 Q 70 140 50 150 Z" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
                            
                            <!-- Greenland -->
                            <path d="M 270 80 Q 290 75 310 85 L 320 100 Q 315 120 300 125 L 285 120 Q 275 110 270 95 Z" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
                            
                            <!-- South America -->
                            <path d="M 230 290 Q 250 285 270 295 L 280 310 Q 285 330 280 350 L 275 370 Q 270 390 265 410 L 260 430 Q 250 445 235 440 L 220 435 Q 205 425 200 405 L 195 385 Q 190 365 195 345 L 200 325 Q 210 305 230 290 Z" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
                            
                            <!-- Europe -->
                            <path d="M 450 120 Q 470 115 490 120 L 510 125 Q 530 135 540 150 L 545 165 Q 540 180 525 185 L 505 190 Q 485 185 470 175 L 455 165 Q 445 150 450 135 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
                            
                            <!-- Scandinavia -->
                            <path d="M 480 90 Q 500 85 520 90 L 530 105 Q 525 120 515 125 L 500 120 Q 485 115 480 100 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
                            
                            <!-- Africa -->
                            <path d="M 470 200 Q 490 195 510 200 L 530 210 Q 550 225 560 250 L 565 275 Q 570 300 565 325 L 560 350 Q 550 375 535 390 L 515 400 Q 495 395 480 385 L 465 370 Q 455 350 460 325 L 465 300 Q 470 275 475 250 L 480 225 Q 475 212 470 200 Z" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
                            
                            <!-- Asia -->
                            <!-- Russia/Siberia -->
                            <path d="M 550 100 Q 580 95 620 100 L 660 105 Q 700 110 740 120 L 780 130 Q 820 140 850 155 L 870 170 Q 875 185 870 200 L 860 215 Q 845 225 825 230 L 800 235 Q 775 230 750 225 L 725 220 Q 700 215 675 210 L 650 205 Q 625 200 600 195 L 575 190 Q 560 180 555 165 L 550 150 Q 545 135 550 120 Z" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
                            
                            <!-- China/Southeast Asia -->
                            <path d="M 650 200 Q 680 195 710 205 L 740 215 Q 770 230 780 255 L 785 280 Q 780 305 765 320 L 745 330 Q 725 325 705 315 L 685 305 Q 665 295 655 275 L 650 255 Q 655 235 660 215 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
                            
                            <!-- India -->
                            <path d="M 600 240 Q 620 235 635 245 L 645 260 Q 650 280 640 295 L 625 305 Q 610 300 600 285 L 595 270 Q 590 255 595 240 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
                            
                            <!-- Middle East -->
                            <path d="M 540 200 Q 560 195 580 205 L 590 220 Q 585 235 575 240 L 560 235 Q 545 225 540 210 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
                            
                            <!-- Australia -->
                            <path d="M 750 350 Q 780 345 810 355 L 830 370 Q 835 385 825 395 L 805 400 Q 785 395 765 385 L 750 375 Q 745 365 750 355 Z" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
                            
                            <!-- Japan -->
                            <path d="M 820 220 L 830 215 L 835 225 L 840 235 L 835 245 L 825 250 L 820 240 L 815 230 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
                            
                            <!-- UK/Ireland -->
                            <path d="M 430 140 L 440 135 L 445 145 L 440 155 L 430 150 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
                            
                            <!-- Manufacturing Hub Markers -->
                            <g>
                                <!-- North America - Detroit/Chicago -->
                                <circle cx="200" cy="180" r="5" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="200" y="170" font-size="10" fill="#1f2937" text-anchor="middle" font-weight="bold">USA</text>
                                
                                <!-- Mexico -->
                                <circle cx="170" cy="230" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="170" y="220" font-size="9" fill="#1f2937" text-anchor="middle">Mexico</text>
                                
                                <!-- Germany -->
                                <circle cx="485" cy="155" r="5" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="485" y="145" font-size="10" fill="#1f2937" text-anchor="middle" font-weight="bold">Germany</text>
                                
                                <!-- UK -->
                                <circle cx="435" cy="145" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="435" y="135" font-size="9" fill="#1f2937" text-anchor="middle">UK</text>
                                
                                <!-- Italy -->
                                <circle cx="500" cy="175" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="500" y="165" font-size="9" fill="#1f2937" text-anchor="middle">Italy</text>
                                
                                <!-- China - Shenzhen/Shanghai -->
                                <circle cx="720" cy="240" r="6" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="720" y="230" font-size="11" fill="#1f2937" text-anchor="middle" font-weight="bold">China</text>
                                
                                <!-- Japan -->
                                <circle cx="830" cy="230" r="5" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="830" y="220" font-size="10" fill="#1f2937" text-anchor="middle" font-weight="bold">Japan</text>
                                
                                <!-- South Korea -->
                                <circle cx="770" cy="220" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="770" y="210" font-size="9" fill="#1f2937" text-anchor="middle">S.Korea</text>
                                
                                <!-- Taiwan -->
                                <circle cx="750" cy="250" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="750" y="240" font-size="9" fill="#1f2937" text-anchor="middle">Taiwan</text>
                                
                                <!-- Singapore -->
                                <circle cx="710" cy="290" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="710" y="280" font-size="9" fill="#1f2937" text-anchor="middle">Singapore</text>
                                
                                <!-- India -->
                                <circle cx="620" cy="270" r="5" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="620" y="260" font-size="10" fill="#1f2937" text-anchor="middle" font-weight="bold">India</text>
                                
                                <!-- Brazil -->
                                <circle cx="250" cy="350" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="250" y="340" font-size="9" fill="#1f2937" text-anchor="middle">Brazil</text>
                                
                                <!-- Israel -->
                                <circle cx="555" cy="210" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="555" y="200" font-size="9" fill="#1f2937" text-anchor="middle">Israel</text>
                            </g>
                            
                            <!-- Trade Routes -->
                            <g stroke="#c1272d" stroke-width="2" stroke-dasharray="5,3" fill="none" opacity="0.6">
                                <!-- Trans-Pacific Route -->
                                <path d="M 200 180 Q 400 150 720 240"/>
                                <!-- Trans-Atlantic Route -->
                                <path d="M 200 180 Q 350 160 485 155"/>
                                <!-- Europe-Asia Route -->
                                <path d="M 485 155 Q 600 170 720 240"/>
                                <!-- Asia Internal Routes -->
                                <path d="M 720 240 Q 775 235 830 230"/>
                                <path d="M 720 240 Q 735 245 750 250"/>
                            </g>
                            
                            <!-- Legend -->
                            <g transform="translate(50, 450)">
                                <rect x="0" y="-20" width="300" height="40" fill="white" fill-opacity="0.9" stroke="#e5e7eb" rx="5"/>
                                <circle cx="15" cy="-5" r="4" fill="#c1272d" stroke="#ffffff" stroke-width="2"/>
                                <text x="25" y="0" font-size="11" fill="#374151" font-weight="bold">BMG Manufacturing Partners</text>
                                <line x1="150" y1="-5" x2="170" y2="-5" stroke="#c1272d" stroke-width="2" stroke-dasharray="3,2"/>
                                <text x="175" y="0" font-size="11" fill="#374151">Supply Routes</text>
                            </g>
                            
                            <!-- Title -->
                            <text x="500" y="30" font-size="18" fill="#1f2937" text-anchor="middle" font-weight="bold">BMG Global Manufacturing Network</text>
                        </svg>
                    </div>
                    
                    <!-- Regional Details -->
                    <div class="grid md:grid-cols-2 gap-6">
                        ${data.global_reach.regions.map(region => `
                            <div class="bg-white rounded-lg p-4 shadow border-l-4 border-primary">
                                <h4 class="font-bold text-secondary mb-2">${region.name}</h4>
                                <p class="text-sm text-gray-600 mb-2"><strong>Key Countries:</strong> ${region.countries.join(', ')}</p>
                                <p class="text-sm text-gray-700"><strong>Specialties:</strong></p>
                                <ul class="list-disc list-inside text-sm text-gray-700 mt-1">
                                    ${region.specialties.map(specialty => `<li>${specialty}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- What We Source Section -->
                <div class="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-primary">
                    <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
                        <span>What We Source</span>
                        <span class="text-xl">🔍</span>
                    </h2>
                    <div class="grid md:grid-cols-3 gap-8">
                        ${data.what_we_source.slice(0, 3).map(category => `
                            <div class="bg-white rounded-lg shadow p-4 border-t-4 border-primary flex flex-col items-center">
                                <img src="http://localhost:8000${category.image}" alt="${category.category} production" class="w-full max-w-xs rounded-lg shadow mb-4" />
                                <div class="text-3xl mb-2">${category.icon}</div>
                                <div class="font-bold text-secondary mb-1">${category.category}</div>
                                <ul class="list-disc list-inside text-gray-700 text-sm">
                                    ${category.items.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    <div class="grid md:grid-cols-3 gap-8 mt-8">
                        ${data.what_we_source.slice(3).map(category => `
                            <div class="bg-white rounded-lg shadow p-4 border-t-4 border-secondary flex flex-col items-center">
                                <img src="http://localhost:8000${category.image}" alt="${category.category} production" class="w-full max-w-xs rounded-lg shadow mb-4" />
                                <div class="text-3xl mb-2">${category.icon}</div>
                                <div class="font-bold text-accent mb-1">${category.category}</div>
                                <ul class="list-disc list-inside text-gray-700 text-sm">
                                    ${category.items.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Divider -->
                <div class="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full my-12"></div>

                <!-- Sourcing Process Section -->
                <div class="bg-secondary/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-secondary">
                    <h2 class="text-2xl font-semibold text-secondary mb-6 flex items-center gap-2">
                        <span>Our Sourcing Process</span>
                        <span class="text-xl">🔗</span>
                    </h2>
                    <ol class="list-decimal list-inside text-gray-700 mb-8 space-y-2">
                        ${data.process.map(step => `
                            <li><b>${step.split(':')[0]}:</b> ${step.split(':')[1]}</li>
                        `).join('')}
                    </ol>
                </div>

                <!-- Divider -->
                <div class="h-1 bg-gradient-to-r from-secondary via-primary to-accent rounded-full my-12"></div>

                <!-- Why Choose BMG Section -->
                <div class="bg-primary/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-primary">
                    <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
                        <span>Why Choose BMG for Sourcing?</span>
                        <span class="text-xl">🌟</span>
                    </h2>
                    <ul class="list-disc list-inside text-gray-700 mb-8">
                        ${data.why_choose_bmg.map(reason => `
                            <li><b>${reason.split(':')[0]}:</b> ${reason.split(':')[1]}</li>
                        `).join('')}
                    </ul>
                </div>

                <div class="bg-secondary text-white rounded-lg p-6 text-center mb-8 shadow-lg">
                    <h3 class="text-xl font-bold mb-2">Ready to optimize your sourcing?</h3>
                    <p class="mb-2">Contact us at <a href="mailto:${data.contact.email}" class="underline">${data.contact.email}</a> or <a href="tel:${data.contact.phone.replace(/[^\d]/g, '')}" class="underline">${data.contact.phone}</a> to discuss your project.</p>
                </div>
            </section>
            <div class="flex justify-center pb-12">
                <a href="/" class="mt-8 inline-block bg-primary text-white font-semibold px-6 py-3 rounded shadow hover:bg-secondary transition">Back to Home</a>
            </div>
        </main>
    `;
}

function renderReportsPage(data) {
    updatePageTitle(data.meta.title);
    updateMetaDescription(data.meta.description);
    
    return `
        <main class="bg-background min-h-screen font-sans">
            <div class="flex justify-center pt-10 pb-4 bg-background">
                <a href="/">
                    <img src="http://localhost:8000/static/bmg-logo.png" alt="Boston Manufacturing Group logo" class="h-16 w-auto cursor-pointer" />
                </a>
            </div>
            <section class="max-w-3xl mx-auto py-12 px-4">
                <h1 class="text-4xl font-bold text-secondary mb-6 text-center">${data.title}</h1>
                <p class="text-lg text-accent mb-8 text-center">
                    ${data.description}
                </p>
                <div class="space-y-8">
                    ${data.reports.map(report => `
                        <div class="bg-white border-l-4 border-primary rounded-lg shadow p-6">
                            <h2 class="text-2xl font-semibold text-secondary mb-2">${report.title}</h2>
                            <p class="text-accent mb-1">${report.author} &middot; ${report.date}</p>
                            <p class="text-gray-700 mb-4">${report.summary}</p>
                            <a href="${report.url}" class="text-primary font-semibold hover:underline">Read More</a>
                        </div>
                    `).join('')}
                </div>
            </section>
        </main>
    `;
}

function renderReportPage(data) {
    updatePageTitle(data.meta.title);
    
    const report = data.report;
    return `
        <main class="bg-background min-h-screen font-sans">
            <div class="flex justify-center pt-10 pb-4 bg-background">
                <a href="/reports">
                    <img src="http://localhost:8000/static/bmg-logo.png" alt="Boston Manufacturing Group logo" class="h-16 w-auto cursor-pointer" />
                </a>
            </div>
            <section class="max-w-3xl mx-auto py-12 px-4">
                <h1 class="text-3xl font-bold text-secondary mb-4">${report.title}</h1>
                <div class="flex items-center gap-3 mb-2">
                    <img src="http://localhost:8000/static/guy-breier.png" alt="Guy Breier portrait" class="w-8 h-8 rounded-full object-cover border-2 border-secondary" />
                    <p class="text-accent">${report.author} &middot; ${report.date}</p>
                </div>
                ${report.id === 'trust-but-verify-supplier-qualification-by-process-capability' ? 
                    `<img src="http://localhost:8000/static/trust-but-verify-photo.png" alt="Report illustration or figure from Trust but Verify report" class="w-full max-w-md mx-auto my-6 rounded shadow" />` : 
                    ''
                }
                <article class="prose prose-blue max-w-none">
                    ${report.content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                </article>
            </section>
            <div class="flex justify-center pb-12">
                <a href="/" class="mt-8 inline-block bg-primary text-white font-semibold px-6 py-3 rounded shadow hover:bg-secondary transition">Back to Home</a>
            </div>
        </main>
    `;
} 