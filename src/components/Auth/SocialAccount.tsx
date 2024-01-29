export function SocialAccount({ page }: { page: string }): JSX.Element {
  return (
    <div
      className={`flex justify-center gap-3 ${
        page === 'login' ? 'mt-16 lg:mt-0' : 'mt-2 lg:mt-0'
      }`}
    >
      <a href="##">
        <img src="/src/assets/icons/facebook.png" alt="Facebook logo" />
      </a>
      <a href="##">
        <img src="/src/assets/icons/apple.png" alt="Apple logo" />
      </a>
      <a href="##">
        <img src="/src/assets/icons/google.png" alt="Google logo" />
      </a>
    </div>
  );
}
