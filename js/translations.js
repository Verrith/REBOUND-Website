document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            button: 'FR',
            buttonLabel: 'Switch the site to French',
            studioTitle: 'What is RE:BOUND?',
            studioIntro: '<b>RE:BOUND</b> started as a game jam project in early February 2026 and has since grown into a fully fledged project.<br>The core question we wanted to answer in the game jam was, what if you could parry everything? And then further; what if that was the only method you had to deal damage?<br>Over the course of the jam we made a fairly compelling movement shooter crossed with a dungeon crawler, and when it was over, I decided to continue development.<br>Since that point I\'ve pushed the idea further and further, improving everything about the game to the highest standard I can reach.',
            studioGameplay: '<b>RE:BOUND</b> today is a first-person movement roguelite, you are a lamplighter, tasked with driving back the darkness from the wickfolk settlements within the vast interconnected network of the underdark. Recently, the darkness has been smothering settlement after settlement.<br>You and the other lamplighters have been directed to delve deep, try to find the heart of darkness, and destroy it.<br>Throughout your run you\'ll have to make choices about which settlements to save from darkness on your journey to the next level, each one you save grants you an upgrade.<br>But you need to be fast, the longer you spend on a level, the more the darkness spreads, and the more settlements are lost to the darkness.',
            studioFuture: '<b>RE:BOUND</b> will be constantly evolving as I make the game\'s demo ready for public release. This concept has huge potential, and I can\'t wait to see people reach the very high skill cap of the systems I\'ve created.',
            shieldKicker: 'Lamplighter Arsenal',
            aboutTitle: 'About me',
            aboutText: 'Hey! I\'m Ben, a primarily solo developer based in Montr\u00e9al, Qu\u00e9bec and the founder of <b>Blackfeather Studios</b>.<br>my day job I work as an algorithms engineer for Procedural Worlds building tools which enable unity developers to procedurally generate anthropogenic structures at a large scale.<br>By night, I work on indie projects, currently <b>RE:BOUND</b>.<br><br>This game will be my first solo release, and I couldn\'t be more excited for it!'
        },
        fr: {
            button: 'EN',
            buttonLabel: 'Mettre le site en anglais',
            studioTitle: 'Qu\u2019est-ce que RE:BOUND?',
            studioIntro: '<b>RE:BOUND</b> a commenc\u00e9 comme un projet de game jam au d\u00e9but de f\u00e9vrier 2026, puis il est devenu un projet complet.<br>La question principale de la game jam \u00e9tait simple: et si on pouvait tout parer? Et plus encore: et si c\u2019\u00e9tait la seule fa\u00e7on d\u2019infliger des d\u00e9g\u00e2ts?<br>Pendant la jam, nous avons cr\u00e9\u00e9 un movement shooter assez solide m\u00e9lang\u00e9 \u00e0 un dungeon crawler. Une fois la jam termin\u00e9e, j\u2019ai d\u00e9cid\u00e9 de continuer le d\u00e9veloppement.<br>Depuis, j\u2019ai pouss\u00e9 l\u2019id\u00e9e de plus en plus loin, en am\u00e9liorant chaque aspect du jeu au meilleur niveau possible.',
            studioGameplay: '<b>RE:BOUND</b> est aujourd\u2019hui un roguelite de mouvement \u00e0 la premi\u00e8re personne. Tu incarnes un allumeur de lampes charg\u00e9 de repousser les t\u00e9n\u00e8bres des colonies wickfolk dans l\u2019immense r\u00e9seau interconnect\u00e9 de l\u2019Underdark. R\u00e9cemment, les t\u00e9n\u00e8bres ont englouti colonie apr\u00e8s colonie.<br>Toi et les autres allumeurs devez descendre dans les profondeurs, trouver le coeur des t\u00e9n\u00e8bres et le d\u00e9truire.<br>Pendant ta partie, tu devras choisir quelles colonies sauver des t\u00e9n\u00e8bres avant d\u2019atteindre le niveau suivant. Chaque colonie sauv\u00e9e te donne une am\u00e9lioration.<br>Mais il faut aller vite: plus tu passes de temps dans un niveau, plus les t\u00e9n\u00e8bres se propagent, et plus les colonies sont perdues.',
            studioFuture: '<b>RE:BOUND</b> continuera d\u2019\u00e9voluer pendant que je pr\u00e9pare la d\u00e9mo pour une sortie publique. Le concept a un potentiel \u00e9norme, et j\u2019ai vraiment h\u00e2te de voir les joueurs atteindre le tr\u00e8s haut plafond de ma\u00eetrise des syst\u00e8mes que j\u2019ai cr\u00e9\u00e9s.',
            shieldKicker: 'Arsenal de l\u2019allumeur',
            aboutTitle: '\u00c0 propos de moi',
            aboutText: 'Salut! Je suis Ben, un d\u00e9veloppeur principalement solo bas\u00e9 \u00e0 Montr\u00e9al, Qu\u00e9bec, et le fondateur de <b>Blackfeather Studios</b>.<br>Le jour, je travaille comme ing\u00e9nieur en algorithmes chez Procedural Worlds, o\u00f9 je cr\u00e9e des outils qui permettent aux d\u00e9veloppeurs Unity de g\u00e9n\u00e9rer proc\u00e9duralement des structures humaines \u00e0 grande \u00e9chelle.<br>Le soir, je travaille sur des projets ind\u00e9pendants, actuellement <b>RE:BOUND</b>.<br><br>Ce jeu sera ma premi\u00e8re sortie solo, et je suis vraiment impatient de le partager!'
        }
    };

    const shieldTranslations = [
        {
            name: 'Bouclier tour',
            alt: 'Bouclier tour',
            description: 'Un mur de fer massif avec une fen\u00eatre de parade plus large, con\u00e7u pour une d\u00e9fense pos\u00e9e.',
            stats: [['Fen\u00eatre de parade', '0,20s', 'neutral'], ['Longueur de glissade murale', '-0,50', 'bad'], ['Contr\u00f4le de glissade', '-15,00', 'bad'], ['Contr\u00f4le a\u00e9rien', '-15,00', 'bad']]
        },
        {
            name: 'Targe',
            alt: 'Targe',
            description: 'Petit, vif, et fait pour un mouvement agressif avec une parade plus serr\u00e9e.',
            stats: [['Sant\u00e9 max', '-10', 'bad'], ['Fen\u00eatre de parade', '-0,10s', 'bad'], ['Force de parade', '+5,00', 'good'], ['C\u00f4ne de parade', '-10,00', 'bad'], ['Vitesse', '+5,00', 'good'], ['Force de saut', '+2,00', 'good'], ['Vitesse de glissade murale', '+1,00', 'good'], ['Longueur de glissade murale', '0,50', 'neutral'], ['Force de saut en glissade', '+2,00', 'good'], ['Contr\u00f4le de glissade', '+20,00', 'good'], ['Contr\u00f4le a\u00e9rien', '+20,00', 'good']]
        },
        {
            name: 'Bouclier sacr\u00e9',
            alt: 'Bouclier sacr\u00e9',
            description: 'Une relique risqu\u00e9e qui \u00e9change sant\u00e9 et taille du c\u00f4ne contre force et survie.',
            stats: [['Sant\u00e9 max', '-10', 'bad'], ['Fen\u00eatre de parade', '0,05s', 'neutral'], ['Force de parade', '+3,00', 'good'], ['C\u00f4ne de parade', '-3,00', 'bad'], ['Soin par \u00e9limination', '+5,00', 'good']]
        },
        {
            name: 'Bouclier heater',
            alt: 'Bouclier heater',
            description: 'Un choix polyvalent avec sant\u00e9, force et un peu plus de mouvement.',
            stats: [['Sant\u00e9 max', '+10', 'good'], ['Force de parade', '+3,00', 'good'], ['Vitesse', '+2,00', 'good']]
        },
        {
            name: 'Bouclier barbare',
            alt: 'Bouclier barbare',
            description: 'Beaucoup de sant\u00e9 et de force de parade, mais de lourdes p\u00e9nalit\u00e9s de mouvement.',
            stats: [['Sant\u00e9 max', '+100', 'good'], ['Force de parade', '+3,00', 'good'], ['Vitesse', '-5,00', 'bad'], ['Contr\u00f4le de glissade', '-45,00', 'bad'], ['Contr\u00f4le a\u00e9rien', '-45,00', 'bad']]
        }
    ];

    const languageToggle = document.querySelector('[data-language-toggle]');
    let currentLanguage = document.documentElement.lang === 'fr' ? 'fr' : 'en';

    function applyLanguage(language) {
        const text = translations[language];
        if (!text) return;

        currentLanguage = language;
        document.documentElement.lang = language;

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;
            if (text[key]) element.textContent = text[key];
        });

        document.querySelectorAll('[data-i18n-html]').forEach((element) => {
            const key = element.dataset.i18nHtml;
            if (text[key]) element.innerHTML = text[key];
        });

        if (languageToggle) {
            languageToggle.textContent = text.button;
            languageToggle.setAttribute('aria-label', text.buttonLabel);
        }

        window.dispatchEvent(new CustomEvent('rebound:languagechange', {
            detail: { language }
        }));
    }

    window.reboundTranslations = {
        getLanguage() {
            return currentLanguage;
        },
        getShieldText(index, fallback) {
            if (currentLanguage === 'fr' && shieldTranslations[index]) {
                return {
                    ...fallback,
                    ...shieldTranslations[index]
                };
            }

            return fallback;
        }
    };

    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            applyLanguage(currentLanguage === 'en' ? 'fr' : 'en');
        });
    }

    applyLanguage(currentLanguage);
});
