import { 
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, 
  SiPython, SiTailwindcss, SiMongodb, SiGit,
  SiVite, SiRedux, SiHtml5
} from '@icons-pack/react-simple-icons';
import './TechOrbit.css';

const scatteredIcons = [
  // Adjusted positions to fit a wider screen layout
  { icon: SiReact, color: '#61DAFB', top: '20%', left: '15%', size: 45, delay: '0s', duration: '4s' },
  { icon: SiTypescript, color: '#3178C6', top: '60%', left: '25%', size: 35, delay: '1s', duration: '5s' },
  { icon: SiJavascript, color: '#F7DF1E', top: '30%', left: '40%', size: 40, delay: '2s', duration: '6s' },
  { icon: SiNodedotjs, color: '#339933', top: '75%', left: '50%', size: 50, delay: '0.5s', duration: '4.5s' },
  { icon: SiPython, color: '#3776AB', top: '15%', left: '65%', size: 55, delay: '1.5s', duration: '7s' }, 
  { icon: SiTailwindcss, color: '#06B6D4', top: '80%', left: '80%', size: 40, delay: '0.2s', duration: '5.5s' },
  { icon: SiMongodb, color: '#47A248', top: '40%', left: '85%', size: 35, delay: '2.5s', duration: '6.5s' },
  { icon: SiGit, color: '#F05032', top: '65%', left: '70%', size: 45, delay: '1.2s', duration: '4.8s' },
  { icon: SiVite, color: '#646CFF', top: '50%', left: '10%', size: 40, delay: '0.8s', duration: '5.2s' },
  { icon: SiRedux, color: '#764ABC', top: '85%', left: '35%', size: 35, delay: '1.8s', duration: '6.2s' },
];

export default function TechOrbit() {
  return (
    <div className="terminal-wrapper">
      <div className="glow-orb"></div>
      
      {/* Widescreen Dashboard Window */}
      <div className="terminal-window">
        
        <div className="terminal-header">
          <div className="mac-buttons">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">analytics_dashboard.exe</span>
        </div>

        {/* Dashboard Body */}
        <div className="scatter-container">
          
          {/* Mock Analytics Chart Background */}
          <div className="mock-chart">
            <div className="chart-bar" style={{ height: '30%' }}></div>
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '45%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '55%' }}></div>
            <div className="chart-bar" style={{ height: '95%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
          </div>

          {/* Floating Tech Icons */}
          {scatteredIcons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="scatter-item" 
                style={{ 
                  top: item.top, 
                  left: item.left,
                  '--delay': item.delay,
                  '--duration': item.duration
                }}
              >
                <Icon color={item.color} size={item.size} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}