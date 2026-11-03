import { 
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, 
  SiPython, SiTailwindcss, SiMongodb, SiGit,
  SiVite, SiRedux, SiHtml5
} from '@icons-pack/react-simple-icons';
import './TechOrbit.css';

const orbitIcons = [
  { icon: SiReact, color: '#61DAFB' },
  { icon: SiTypescript, color: '#3178C6' },
  { icon: SiJavascript, color: '#F7DF1E' },
  { icon: SiNodedotjs, color: '#339933' },
  { icon: SiPython, color: '#3776AB' },
  { icon: SiTailwindcss, color: '#06B6D4' },
  { icon: SiMongodb, color: '#47A248' },
  { icon: SiGit, color: '#F05032' },
  { icon: SiVite, color: '#646CFF' },
  { icon: SiRedux, color: '#764ABC' },
  { icon: SiHtml5, color: '#E34F26' },
  // { icon: SiCss3, color: '#1572B6' }
];

export default function TechOrbit() {
  return (
    <div className="orbit-container">
      <div className="orbit">
        {orbitIcons.map((item, index) => {
          const Icon = item.icon;
          // Distribute icons evenly across the circle
          const angle = (index / orbitIcons.length) * 360;
          return (
            <div 
              key={index} 
              className="orbit-item" 
              style={{ 
                '--angle': `${angle}deg`, 
                '--delay': `${index * -0.5}s` 
              }}
            >
              <Icon color={item.color} size={40} />
            </div>
          );
        })}
      </div>
    </div>
  );
}