import React from 'react';
import './footer.css';
import imageAna from '../../assets/ana.jpg';
import imageMikel from '../../assets/mikelondrio.png';
import imageNatxo from '../../assets/natxo.png';


const Footer = () => {
    const year = new Date().getFullYear();
    const creators = [
        { id: 1, name: 'Anna', avatar: imageAna, url: 'https://github.com/annamelya2021' },
        { id: 2, name: 'Mikel', avatar: imageMikel, url: 'https://github.com/Mikelondrio' },
        { id: 3, name: 'Natxo', avatar: imageNatxo, url: 'https://github.com/ignaciochagar' },
        
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <button className="scroll-to-top" onClick={scrollToTop}>
                ↑
            </button>
            <div className="copyright">&copy; {year} Technode - Express</div>
            <div className="creators">
                {creators.map(creator => (
                    <a key={creator.id} href={creator.url} target="_blank" rel="noopener noreferrer" className="creator-link">
                        <div className="creator">
                            <img src={creator.avatar} alt={creator.name} className="creator-avatar" />
                            <span className="creator-name">{creator.name}</span>
                        </div>
                    </a>
                ))}
            </div>
        </footer>
    );
}

export default Footer;