import React, { useEffect, useState, useRef } from 'react';
import './Skills.css';

const skills = [
    { name: 'HTML & CSS', level: 90 },
    { name: 'JavaScript', level: 80 },
    { name: 'ReactJS', level: 85 },
    { name: 'Flutter', level: 99 },
];

const Skills = () => {
    const sectionRef = useRef();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const current = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                }
            },
            { threshold: 0.3 }
        );

        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="skills-section">
            <div className="skills-left">
                {skills.map((skill, index) => (
                    <div key={index} className="skill-bar">
                        <div className="label">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                        </div>
                        <div className="bar-bg">
                            <div
                                className="bar-fill"
                                style={{ width: animate ? `${skill.level}%` : 0 }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="skills-right">
                <h2>My Skills</h2>
                <p>
                    لدي خبرة قوية في بناء الواجهات المتجاوبة باستخدام ReactJS، CSS Grid وFlexbox،
                    بالإضافة إلى كتابة كود نظيف ومحسن.<br />
                    أيضا لدي خبرة قوية في بناء تطبيقات الأندرويد و الايفون باستخدام فلاتر.
                </p>

                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=mhmdsalah2022@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn"
                >
                    Contact Me
                </a>


            </div>
        </section>
    );
};

export default Skills;
