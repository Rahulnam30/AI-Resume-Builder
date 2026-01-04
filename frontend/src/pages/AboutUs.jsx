import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
    return (
        <div className="bg-white text-slate-900 font-display overflow-x-hidden">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
                <div className="absolute inset-0 network-pattern opacity-5" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAzcbaPGNKzvY2oRX3oMY5M9awoeTX68nnsGekw5yT6hE7o9J87kBKsUVsXg7C89OL_omh5Sqli0scXYZS6YX9IsN7VxARXucv1UJvFjcAku-LeGRoGHhnq1NvgpmjebyTBMCIZ2VZ4Ewlzt4IoaghZ4J_a3YzW5HBwh5Uu2qt0BX5Rnvw_gWx87eS7gKjYkhsySwvqjvXwm1nQhBl6SOKvPhggzUoqWj_3zhD6yYv8kt3WRrUbwv8-vnoc47sYLHBwrP5EIpitJ4o)', backgroundSize: '60px 60px' }}></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
                        Empowering Careers with Artificial Intelligence.
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        We are on a mission to democratize career growth by making professional resumes accessible to everyone.
                    </p>
                </div>
            </section>

            {/* Problem/Solution Section */}
            <section className="py-24 lg:py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                            <img alt="Corporate photo showing a confident job seeker" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL4Zb8qBiGFupix70ec6AOraTOaLU4R8jYDItFucDFzUppb19vasGIHidq1v61mhGHbdLeWhLPB-6lZb2YrWrV20fOwud5qlCxQrAmiSLhNxzjSOYHTzjSl-zIq7n8LsWzto_GHjXvOjHQIASs1d8b0HokNqYDf8WPje3C-HrMxZznp2TAaIfXrLLo0CdOQ562GmWdSSvID9uXS8ubOKEjRCS6EwrnZF8yrxv3h6jsTUP9B63ehmDZk6wbBB_ibivWA11VRyweBvU" />
                        </div>
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Job Market is Broken.</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                In today's competitive landscape, countless qualified candidates are overlooked due to complex Applicant Tracking Systems (ATS) that filter resumes based on algorithms, not true potential. Many excellent professionals never even get a chance to interview.
                            </p>
                            <p className="text-lg font-semibold text-primary mb-0">
                                We built ResumeAI to fix this, ensuring every talent finds its rightful place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
                        <div className="space-y-2">
                            <p className="text-5xl font-extrabold">1M+</p>
                            <p className="text-lg font-medium opacity-90">Resumes Built</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl font-extrabold">85%</p>
                            <p className="text-lg font-medium opacity-90">Interview Rate</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl font-extrabold">50+</p>
                            <p className="text-lg font-medium opacity-90">Countries</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl font-extrabold">24/7</p>
                            <p className="text-lg font-medium opacity-90">AI Availability</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet the Builders.</h2>
                        <p className="text-lg text-slate-600">Our diverse team of AI experts, designers, and career coaches are passionate about your success.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Member 1: Jane Doe */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm">
                            <img alt="Jane Doe" className="w-[120px] h-[120px] rounded-full object-cover object-center mx-auto mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPgl535LSFHSVgk7jw_vTqOnvfcRCLKb4LmvZKVdiPAo6K_uwMmduveodHyOd2oVtsY9ksrpK2NKgU0KxiTM8e4XoZiFWtGXW5xfUNZTzt3lGxjAjBMEwLeqQVlawJmD_quvRmXwK5ievmLrTvXn8D0-di_vQpyQe0zqS5sNcDb0bXHwdxrzLLjRolZ4qgn6dM9SEH8Gcmc34Ys5k7s5XNg8m9N1t6qd_zNDpIjkmhOTTYRxibZXHrHTPpKJ03Pu5FsLBvkstinko" />
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Jane Doe</h3>
                            <p className="text-slate-600 text-sm mb-4">Founder & CEO</p>
                            {/* SVG Icon */}
                        </div>
                        {/* Member 2: John Smith */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm">
                            <img alt="John Smith" className="w-[120px] h-[120px] rounded-full object-cover object-center mx-auto mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7jzR8pVJXt4h0616f0uhGuAbhxqVpueaJG3g23MHOUGs5WKGOwUx2XZDLlRj8tLw8F_eN9V4QfTxi9bjHiYmZy8qlPhowiC5pbQjdUDrqnORWwfteN5hilehPT5k-bY6fyTsHXoYeFnnFjXYY__H0qgHaLS2Qux2rJvRZOr9DxLwSuvoJio_blBksdODPK9vnPz1H8_FdfhvdSx2TrHeq7Y2RTxCNEAbRvpafxtvJpSBTgW6ds2JpM2qZaadHIwKPrvVls5Tu4z0" />
                            <h3 className="text-xl font-bold text-slate-900 mb-1">John Smith</h3>
                            <p className="text-slate-600 text-sm mb-4">Lead AI Engineer</p>
                        </div>
                        {/* Member 3: Emily White */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm">
                            <img alt="Emily White" className="w-[120px] h-[120px] rounded-full object-cover object-center mx-auto mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3i6q6Db36OjfDtKAokwfk0ojJGmmTSyZW_u9k5GTXMlVHfGIvwTx2VNqMOF1knTIBJitDSoMraqhL4kJzyfu-joMXyaV9duXYObkd2QwmvLbG3L2S-83l0GHn7AyB--JOenXzugCKdwiGk6F24id96HlM0mCy-6_-qOAy3a4z-HL0NiH_jg6_LaNESo_9jZ-B-GeGJXUehrHyZ_Non6Dss3_JItFd5ROd2GRooJdiep0E08FALrFbayoeoHok8ssA6djQ64eOeLo" />
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Emily White</h3>
                            <p className="text-slate-600 text-sm mb-4">Head of Product</p>
                        </div>
                        {/* Member 4: David Lee */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm">
                            <img alt="David Lee" className="w-[120px] h-[120px] rounded-full object-cover object-center mx-auto mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoUNgbQd59SYCLXybI6Nn2_9fAru-TL3DOZT37jb9TwORq7GMkevBo3RBkbRaQQBWNjwZOMU-rwUMtybCfcgfcxVl2EP1MOJIPHzYhZJwcR7SFiup-kccz3WGyx5neFqmm6Nv9FF2Z0BPmwEuAFF8ReRjA9MSYrf4XqKcL77cdANZffXZV-924dZ8JMWfm78NlwEzNZWqXmHAv0aU4QbvIzgjzGsHuDFEluGwOQzqHfoZ-NurrTn3QBHyoCYnJQhjeBBX44Ssgbfg" />
                            <h3 className="text-xl font-bold text-slate-900 mb-1">David Lee</h3>
                            <p className="text-slate-600 text-sm mb-4">Marketing Director</p>
                        </div>
                        {/* Member 5: Sarah Chen */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm">
                            <img alt="Sarah Chen" className="w-[120px] h-[120px] rounded-full object-cover object-center mx-auto mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvboo4WjDqisFlAF4QsfuUc-XGlueXsq3uTz6klFbz611NqVZjztShwsqT78e1vWUb5icgucr1yAHxF18nXEflscCo6Szzo_lm1Qr92bVFPkldtqteQCa_3hKL3EI5SqFzDheGFl8EjU9GHDDwUsQtF3VYlMBgeA-DbyShl59KrgBMaxAED9cLnYtjpZB4pwpRBVTrM1lYfbZDcWpkShOokq_UU9Tb7QliGbMqN-SV1-2m0jt4bXjJXK3RXv5kWUVEvi9Wgo5qS8c" />
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Sarah Chen</h3>
                            <p className="text-slate-600 text-sm mb-4">UX Designer</p>
                        </div>
                        {/* Member 6: Michael Brown */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm">
                            <img alt="Michael Brown" className="w-[120px] h-[120px] rounded-full object-cover object-center mx-auto mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADPE-7OB5cYOCK1uZ2ff2nvQ1YSys56Q1uByJQIywdeAoUWIvXdYAW3IJ1qQ6IlKNr2I8MLRl7soU6U3XwA1AdisEJpo_PoVre3q4j0DWBNxOzm8MX5s7oKfo-og-F7mDb9P9xiIs59YG02jdvhSPm082cBvEWrrHFSsNqlN6ZukLpr7rBOfUYPMdq0JrhOYzzHe5ndRP4QUvVx46Y4QFpU8REKFFlxraLie_ba9Qaw3OR7gWrEjps8pSN955vGwT96Mo_ml1HcuQ" />
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Michael Brown</h3>
                            <p className="text-slate-600 text-sm mb-4">Operations Lead</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 lg:py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
                        <p className="text-lg text-slate-600">These principles guide everything we do and build for your career success.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-8 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                            <div className="size-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl">lock</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h3>
                            <p className="text-slate-600 leading-relaxed">Your data is yours. We are committed to never selling your personal information to third parties.</p>
                        </div>
                        <div className="p-8 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                            <div className="size-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl">star</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Uncompromised Quality</h3>
                            <p className="text-slate-600 leading-relaxed">Every template and AI suggestion is crafted and approved by career experts and recruiters.</p>
                        </div>
                        <div className="p-8 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                            <div className="size-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl">bolt</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Efficiency & Speed</h3>
                            <p className="text-slate-600 leading-relaxed">Build a professional resume in minutes, not hours, so you can focus on your job search.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Ready to land your dream job?</h2>
                    <button className="px-10 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/25">
                        Build My Resume Now
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
