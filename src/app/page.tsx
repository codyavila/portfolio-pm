import { 
  Hero, 
  ScaleGrid, 
  TechnicalBridge,
  PMBridgeToggle,
  ProjectSheet, 
  Contact, 
  Footer,
  AIAssistant,
  ScrollProgress,
  ThemeToggle
} from '@/components'

export default function Home() {
  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Theme Toggle - Floating */}
      <ThemeToggle />
      
      <main id="top" className="relative overflow-hidden">
        {/* Hero Section */}
        <Hero />
        
        {/* Live Dashboard - Scale Grid */}
        <ScaleGrid />
        
        {/* The Technical Bridge - Quick split view */}
        <TechnicalBridge />

        {/* Interactive PM Bridge Toggle */}
        <PMBridgeToggle />
        
        {/* Product Case Studies - Sheet/Drawer with PM Artifacts */}
        <ProjectSheet />
        
        {/* Professional Summary & Contact */}
        <Contact />
        
        {/* Footer */}
        <Footer />
      </main>

      {/* AI Portfolio Assistant - Floating */}
      <AIAssistant />
    </>
  )
}
