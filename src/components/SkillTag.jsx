import { SKILL_COLORS } from '../data/mockData';
import './SkillTag.css';

export default function SkillTag({ skill, small = false }) {
  const color = SKILL_COLORS[skill] || '#0891b2';

  return (
    <span
      className={`skill-tag ${small ? 'small' : ''}`}
      style={{
        '--tag-color': color,
        '--tag-bg': `${color}18`,
        '--tag-border': `${color}30`,
      }}
    >
      {skill}
    </span>
  );
}
