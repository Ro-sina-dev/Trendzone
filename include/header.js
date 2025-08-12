
    // Script pour gérer l'affichage mobile
    document.addEventListener('DOMContentLoaded', function() {
        // Gestion du menu burger
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenuModal = document.getElementById('mobileMenuModal');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        
        if (mobileMenuToggle && mobileMenuModal) {
            mobileMenuToggle.addEventListener('click', function() {
                mobileMenuModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
        
        
        if (closeMobileMenu && mobileMenuModal) {
            closeMobileMenu.addEventListener('click', function() {
                mobileMenuModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Fermer le modal si on clique en dehors
        mobileMenuModal.addEventListener('click', function(e) {
            if (e.target === mobileMenuModal) {
                mobileMenuModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Gestion des menus déroulants desktop
        const toggleButtons = document.querySelectorAll('[id$="Toggle"]');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const dropdownId = this.id.replace('Toggle', '');
                const dropdown = document.getElementById(dropdownId);
                const isVisible = dropdown.style.display === 'block';
                
                // Fermer tous les autres menus
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu.id !== dropdownId) {
                        menu.style.display = 'none';
                    }
                });
                
                // Basculer l'affichage du menu courant
                dropdown.style.display = isVisible ? 'none' : 'block';
            });
        });
        
        // Fermer les menus déroulants quand on clique ailleurs
        document.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        });
        
        // Empêcher la fermeture quand on clique dans le menu
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
        
        // Fonction pour changer la langue
        window.changeLanguage = function(lang) {
            console.log('Changement de langue vers:', lang);
            // Ici vous ajouteriez la logique pour changer la langue
            document.querySelectorAll('.language-code').forEach(el => {
                el.textContent = lang.toUpperCase();
            });
            document.getElementById('mobileMenuModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    });


// Liste complète des pays avec leurs devises (exemple partiel)
const countries = [
    { code: 'FR', name: 'France', currency: 'EUR', symbol: '€', flag: 'fr' },
    { code: 'DE', name: 'Allemagne', currency: 'EUR', symbol: '€', flag: 'de' },
    { code: 'US', name: 'États-Unis', currency: 'USD', symbol: '$', flag: 'us' },
    { code: 'GB', name: 'Royaume-Uni', currency: 'GBP', symbol: '£', flag: 'gb' },
    { code: 'JP', name: 'Japon', currency: 'JPY', symbol: '¥', flag: 'jp' },
    { code: 'CA', name: 'Canada', currency: 'CAD', symbol: '$', flag: 'ca' },
    { code: 'AU', name: 'Australie', currency: 'AUD', symbol: '$', flag: 'au' },
    { code: 'CN', name: 'Chine', currency: 'CNY', symbol: '¥', flag: 'cn' },
    { code: 'BR', name: 'Brésil', currency: 'BRL', symbol: 'R$', flag: 'br' },
    { code: 'IN', name: 'Inde', currency: 'INR', symbol: '₹', flag: 'in' },
    // Ajoutez ici tous les autres pays nécessaires
];

document.addEventListener('DOMContentLoaded', function() {
    const countryToggle = document.getElementById('countryToggle');
    const dropdownCountry = document.getElementById('dropdownCountry');
    const countryList = document.getElementById('countryList');
    const countrySearch = document.getElementById('countrySearch');
    const closeCountryMenu = document.getElementById('closeCountryMenu');
    
    // Générer la liste des pays
    function generateCountryList(filter = '') {
        countryList.innerHTML = '';
        const filtered = filter ? 
            countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase())) : 
            countries;
        
        filtered.forEach(country => {
            const countryElement = document.createElement('div');
            countryElement.className = 'country-option';
            countryElement.style.display = 'flex';
            countryElement.style.alignItems = 'center';
            countryElement.style.padding = '10px 15px';
            countryElement.style.cursor = 'pointer';
            countryElement.style.borderBottom = '1px solid #f5f5f5';
            countryElement.setAttribute('data-country', country.code);
            countryElement.setAttribute('data-currency', country.currency);
            
            countryElement.innerHTML = `
                <span style="width: 25px; height: 18px; background-image: url('https://flagcdn.com/w20/${country.flag}.png'); background-size: cover; margin-right: 10px;"></span>
                <span style="flex: 1; font-size: 14px;">${country.name}</span>
                <span style="color: #666; font-size: 13px;">${country.symbol} ${country.currency}</span>
            `;
            
            countryElement.addEventListener('click', () => selectCountry(country));
            countryList.appendChild(countryElement);
        });
    }
    
    // Sélectionner un pays
    function selectCountry(country) {
        document.querySelector('.country-flag').style.backgroundImage = `url('https://flagcdn.com/w20/${country.flag}.png')`;
        document.querySelector('.country-code').textContent = country.code;
        dropdownCountry.style.display = 'none';
        
        // Ici vous pouvez implémenter la conversion
        convertPrices(country.currency);
        console.log(`Pays sélectionné: ${country.name}, Devise: ${country.currency}`);
    }
    
    // Fonction de conversion (exemple)
    function convertPrices(targetCurrency) {
        // 1. Récupérer le taux de change depuis une API (ex: https://exchangerate-api.com)
        // 2. Convertir tous les prix sur la page
        // Exemple simplifié:
        fetch(`https://api.exchangerate-api.com/v4/latest/EUR`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[targetCurrency];
                if (rate) {
                    document.querySelectorAll('.price').forEach(priceElement => {
                        const originalPrice = parseFloat(priceElement.getAttribute('data-original-price'));
                        const convertedPrice = (originalPrice * rate).toFixed(2);
                        priceElement.textContent = `${convertedPrice} ${targetCurrency}`;
                    });
                }
            })
            .catch(error => {
                console.error("Erreur de conversion:", error);
                // Solution de repli: afficher les prix dans la devise d'origine
            });
    }
    
    // Gestion des événements
    countryToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownCountry.style.display = dropdownCountry.style.display === 'block' ? 'none' : 'block';
        if (dropdownCountry.style.display === 'block') {
            generateCountryList();
            countrySearch.focus();
        }
    });
    
    closeCountryMenu.addEventListener('click', () => {
        dropdownCountry.style.display = 'none';
    });
    
    countrySearch.addEventListener('input', (e) => {
        generateCountryList(e.target.value);
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.country-dropdown')) {
            dropdownCountry.style.display = 'none';
        }
    });
    
    // Initialisation
    generateCountryList();
});







// Dictionnaire de traduction
const translations = {
    'fr': {
        'search_placeholder': 'Rechercher des meubles, décoration...',
        'select_country': 'Sélectionnez votre pays',
        'search_country': 'Rechercher un pays...'
    },
    'en': {
        'search_placeholder': 'Search for furniture, decor...',
        'select_country': 'Select your country',
        'search_country': 'Search for a country...'
    },
    'es': {
        'search_placeholder': 'Buscar muebles, decoración...',
        'select_country': 'Selecciona tu país',
        'search_country': 'Buscar un país...'
    }
};

// Langue par défaut
let currentLanguage = 'fr';

// Fonction pour changer la langue
function changeLanguage(lang) {
    currentLanguage = lang;
    document.querySelector('.language-code').textContent = lang.toUpperCase();
    document.getElementById('dropdownLanguage').style.display = 'none';
    
    // Mettre à jour les textes traduits
    document.querySelectorAll('.translate').forEach(el => {
        const key = el.getAttribute('data-key');
        el.textContent = translations[lang][key] || translations['fr'][key];
    });
    
    // Mettre à jour le placeholder de recherche
    document.querySelector('.search-container input').placeholder = translations[lang]['search_placeholder'];
    document.getElementById('countrySearch').placeholder = translations[lang]['search_country'];
    
    // Sauvegarder la préférence
    localStorage.setItem('preferredLanguage', lang);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer la langue sauvegardée ou détecter la langue du navigateur
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const browserLanguage = navigator.language.slice(0, 2);
    
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    } else if (translations[browserLanguage]) {
        changeLanguage(browserLanguage);
    }
    
    // Gestion des menus déroulants
    const languageToggle = document.getElementById('languageToggle');
    const dropdownLanguage = document.getElementById('dropdownLanguage');
    
    languageToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownLanguage.style.display = dropdownLanguage.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-dropdown')) {
            dropdownLanguage.style.display = 'none';
        }
    });
    
    // ... (le reste de votre code existant pour les pays) ...
});

// ... (le reste de votre code JavaScript existant) ...
