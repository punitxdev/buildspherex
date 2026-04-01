import './CollaboratorAvatars.css';

export default function CollaboratorAvatars({ collaborators, max = 4, size = 32 }) {
  const visible = collaborators.slice(0, max);
  const overflow = collaborators.length - max;

  return (
    <div className="collaborator-avatars">
      {visible.map((user, i) => (
        <div
          key={user.id}
          className="collab-avatar"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.38,
            zIndex: visible.length - i,
          }}
          title={user.name}
        >
          {user.initials}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="collab-avatar overflow"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.34,
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
