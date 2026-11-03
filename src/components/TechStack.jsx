import { 
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, 
  SiPython, SiTailwindcss, SiMongodb, SiGit 
} from '@icons-pack/react-simple-icons';

const techStack = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
];

export default function TechStack() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
      {techStack.map(({ name, icon: Icon, color }) => (
        <div 
          key={name} 
          title={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '10px',
            borderRadius: '8px',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Icon color={color} size={48} />
          <span style={{ fontSize: '12px', color: '#8892b0' }}>{name}</span>
        </div>
      ))}
    </div>
  );
}