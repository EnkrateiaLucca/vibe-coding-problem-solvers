import React, { useState } from 'react';

// Simulated MDX content - using Unsplash Source API for reliable images
const portfolioContent = {
  projects: [
    {
      id: 1,
      title: "Lumina Brand Identity",
      category: "Branding",
      description: "Complete visual identity system for a sustainable lighting company, featuring organic forms and warm earth tones.",
      image: "https://source.unsplash.com/800x600/?branding,design,minimal",
      year: "2024",
      tags: ["Identity", "Print", "Digital"]
    },
    {
      id: 2,
      title: "Noir Coffee Packaging",
      category: "Packaging",
      description: "Premium coffee packaging design with minimalist aesthetics and tactile finishes.",
      image: "https://source.unsplash.com/800x900/?coffee,packaging,dark",
      year: "2024",
      tags: ["Packaging", "Print"]
    },
    {
      id: 3,
      title: "Velocity App Interface",
      category: "UI/UX",
      description: "Fitness tracking application with dynamic data visualization and personalized coaching features.",
      image: "https://source.unsplash.com/800x600/?app,technology,mobile",
      year: "2023",
      tags: ["Mobile", "UI", "UX"]
    },
    {
      id: 4,
      title: "Coastal Residences",
      category: "Architecture",
      description: "Architectural visualization and marketing materials for a luxury beachfront development.",
      image: "https://source.unsplash.com/800x700/?architecture,modern,house",
      year: "2023",
      tags: ["3D", "Marketing"]
    },
    {
      id: 5,
      title: "Echo Music Festival",
      category: "Event Design",
      description: "Comprehensive event branding including wayfinding, merchandise, and digital presence.",
      image: "https://source.unsplash.com/800x500/?concert,festival,music",
      year: "2023",
      tags: ["Branding", "Environmental"]
    },
    {
      id: 6,
      title: "Artisan Ceramics",
      category: "Photography",
      description: "Product photography series highlighting handcrafted pottery with dramatic lighting.",
      image: "https://source.unsplash.com/800x800/?ceramics,pottery,craft",
      year: "2024",
      tags: ["Photography", "Product"]
    }
  ],
  hero: {
    title: "Creative Portfolio",
    subtitle: "Selected Works 2023—2024",
    description: "A curated collection of branding, digital design, and creative direction projects."
  }
};

// Layout Components
const HeroSlideshow = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const projects = content.projects;

  return (
    <div className="relative h-full w-full bg-neutral-950 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={projects[currentSlide].image}
          alt={projects[currentSlide].title}
          className="w-full h-full object-cover opacity-60 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-amber-500 text-neutral-950 text-xs font-bold tracking-wider uppercase mb-4">
            {projects[currentSlide].category}
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
            {projects[currentSlide].title}
          </h1>
          <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
            {projects[currentSlide].description}
          </p>
          <div className="flex gap-2">
            {projects[currentSlide].tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 border border-neutral-700 text-neutral-400 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-1 transition-all ${
                i === currentSlide ? 'bg-amber-500' : 'bg-neutral-700 hover:bg-neutral-600'
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-8 right-8 text-neutral-500 font-mono text-sm">
          {String(currentSlide + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

const MasonryGrid = ({ content }) => {
  const projects = content.projects;
  const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80'];

  return (
    <div className="min-h-full bg-stone-100 p-6 md:p-10 overflow-auto">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-extralight text-stone-900 tracking-tight">{content.hero.title}</h1>
        <p className="text-stone-500 mt-2">{content.hero.subtitle}</p>
      </header>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`break-inside-avoid group relative overflow-hidden ${heights[i]} bg-stone-200`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/70 transition-all duration-300 flex items-end">
              <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-white text-xl font-light mt-1">{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SplitScreen = ({ content }) => {
  const [activeProject, setActiveProject] = useState(0);
  const projects = content.projects;

  return (
    <div className="h-full flex flex-col md:flex-row bg-neutral-900">
      {/* Left - Image */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
        <img
          src={projects[activeProject].image}
          alt={projects[activeProject].title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 md:hidden" />
      </div>

      {/* Right - Content */}
      <div className="w-full md:w-1/2 flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-10 border-b border-neutral-800">
          <h1 className="text-2xl font-light text-white tracking-wide">{content.hero.title}</h1>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-auto">
          {projects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(i)}
              className={`w-full text-left p-6 md:p-8 border-b border-neutral-800 transition-all ${
                i === activeProject ? 'bg-neutral-800' : 'hover:bg-neutral-800/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-amber-500 text-xs font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-neutral-600 text-sm">{project.year}</span>
              </div>
              <h3 className="text-white text-lg font-light">{project.title}</h3>
              {i === activeProject && (
                <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
                  {project.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GridGallery = ({ content }) => {
  const projects = content.projects;
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Branding', 'Digital', 'Print'];

  return (
    <div className="min-h-full bg-white overflow-auto">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 border-b border-neutral-200">
        <div className="px-6 md:px-10 py-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">{content.hero.title}</h1>
            <p className="text-neutral-500 text-sm mt-1">{content.hero.description}</p>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`transition-colors ${activeFilter === filter ? 'text-neutral-900 font-medium' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                {filter}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Grid */}
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article key={project.id} className="group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden bg-neutral-100 mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-neutral-900 font-medium group-hover:text-amber-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-500 text-sm">{project.category}</p>
              </div>
              <span className="text-neutral-400 text-sm">{project.year}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const MinimalList = ({ content }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const projects = content.projects;

  return (
    <div className="min-h-full bg-neutral-50 flex flex-col overflow-auto">
      {/* Header */}
      <header className="p-8 md:p-16 pb-0">
        <h1 className="text-6xl md:text-8xl font-extralight text-neutral-900 tracking-tighter leading-none">
          {content.hero.title.split(' ')[0]}
          <br />
          <span className="text-neutral-400">{content.hero.title.split(' ')[1]}</span>
        </h1>
      </header>

      {/* Project List */}
      <div className="flex-1 p-8 md:p-16 pt-12">
        {projects.map((project, i) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group border-t border-neutral-300 py-6 cursor-pointer relative"
          >
            <div className="flex justify-between items-baseline">
              <div className="flex items-baseline gap-6">
                <span className="text-neutral-400 text-sm font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl md:text-3xl font-light text-neutral-900 group-hover:text-amber-600 transition-colors">
                  {project.title}
                </h3>
              </div>
              <span className="text-neutral-400 text-sm hidden md:block">
                {project.category}
              </span>
            </div>

            {/* Hover Preview */}
            {hoveredId === project.id && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-32 z-10 shadow-2xl pointer-events-none hidden lg:block">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
        <div className="border-t border-neutral-300" />
      </div>
    </div>
  );
};

const BentoGrid = ({ content }) => {
  const projects = content.projects;

  return (
    <div className="min-h-full bg-neutral-950 p-4 md:p-6 overflow-auto">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-xl font-medium text-white">{content.hero.title}</h1>
        <span className="text-neutral-500 text-sm">{content.hero.subtitle}</span>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3">
        {/* Large Feature - spans 2 cols and 2 rows */}
        <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
          <img
            src={projects[0].image}
            alt={projects[0].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-amber-400 text-xs font-medium uppercase">{projects[0].category}</span>
            <h3 className="text-white text-2xl font-light mt-1">{projects[0].title}</h3>
          </div>
        </div>

        {/* Top right items */}
        <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
          <img
            src={projects[1].image}
            alt={projects[1].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-all" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-sm font-medium truncate">{projects[1].title}</h3>
          </div>
        </div>

        <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
          <img
            src={projects[2].image}
            alt={projects[2].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-all" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-sm font-medium truncate">{projects[2].title}</h3>
          </div>
        </div>

        {/* Wide item spanning 2 columns */}
        <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-2xl">
          <img
            src={projects[3].image}
            alt={projects[3].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-all" />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <h3 className="text-white text-sm font-medium">{projects[3].title}</h3>
            <span className="text-neutral-400 text-xs">{projects[3].category}</span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
          <img
            src={projects[4].image}
            alt={projects[4].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-all" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-sm font-medium truncate">{projects[4].title}</h3>
          </div>
        </div>

        <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
          <img
            src={projects[5].image}
            alt={projects[5].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-all" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-sm font-medium truncate">{projects[5].title}</h3>
          </div>
        </div>

        {/* Extra CTA card */}
        <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center cursor-pointer hover:from-amber-400 hover:to-orange-500 transition-all">
          <div className="text-center p-6">
            <p className="text-white/80 text-sm">Want to see more?</p>
            <h3 className="text-white text-xl font-medium mt-1">View All Projects →</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// Layout configurations
const layouts = [
  { id: 'hero', name: 'Hero Slideshow', component: HeroSlideshow, icon: '◐' },
  { id: 'masonry', name: 'Masonry Grid', component: MasonryGrid, icon: '▦' },
  { id: 'split', name: 'Split Screen', component: SplitScreen, icon: '◧' },
  { id: 'grid', name: 'Grid Gallery', component: GridGallery, icon: '▤' },
  { id: 'minimal', name: 'Minimal List', component: MinimalList, icon: '≡' },
  { id: 'bento', name: 'Bento Grid', component: BentoGrid, icon: '⊞' },
];

// Main App
export default function PortfolioLayoutPreview() {
  const [activeLayout, setActiveLayout] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const CurrentLayout = layouts.find(l => l.id === activeLayout)?.component || HeroSlideshow;

  return (
    <div className="h-screen flex bg-neutral-950 overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-neutral-900 border-r border-neutral-800 flex-shrink-0 overflow-hidden`}
      >
        <div className="w-64 h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-800">
            <h1 className="text-white font-medium tracking-wide">Layout Preview</h1>
            <p className="text-neutral-500 text-xs mt-1">Portfolio Templates</p>
          </div>

          {/* Layout Options */}
          <nav className="flex-1 p-4 overflow-auto">
            <p className="text-neutral-600 text-xs uppercase tracking-wider mb-3 px-2">Layouts</p>
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setActiveLayout(layout.id)}
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center gap-3 transition-all ${
                  activeLayout === layout.id
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{layout.icon}</span>
                <span className="text-sm">{layout.name}</span>
              </button>
            ))}
          </nav>

          {/* MDX Info */}
          <div className="p-4 border-t border-neutral-800">
            <div className="bg-neutral-800/50 rounded-lg p-4">
              <p className="text-neutral-400 text-xs mb-2">Content Source</p>
              <code className="text-amber-500 text-xs">portfolio.mdx</code>
              <p className="text-neutral-600 text-xs mt-2">
                {portfolioContent.projects.length} projects loaded
              </p>
              <p className="text-neutral-600 text-xs mt-1">
                Images: Unsplash API
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <header className="h-12 bg-neutral-900 border-b border-neutral-800 flex items-center px-4 justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-neutral-600">|</span>
            <span className="text-white text-sm">
              {layouts.find(l => l.id === activeLayout)?.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white border border-neutral-700 rounded hover:border-neutral-600 transition-colors">
              Export Code
            </button>
            <button className="px-3 py-1.5 text-xs bg-amber-500 text-neutral-950 rounded font-medium hover:bg-amber-400 transition-colors">
              Use Template
            </button>
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden bg-neutral-800 p-2 md:p-4">
          <div className="w-full h-full bg-neutral-950 rounded-lg overflow-hidden shadow-2xl">
            <CurrentLayout content={portfolioContent} />
          </div>
        </div>
      </main>

      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
    </div>
  );
}
