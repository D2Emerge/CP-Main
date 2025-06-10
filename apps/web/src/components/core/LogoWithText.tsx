import CodeProjectLogo from '@src/assets/icons/CodeProjectLogo';

interface LogoWithTextProps {
  width?: number;
  height?: number;
  logoClassName?: string;
  mainTextClassName?: string;
  subTextClassName?: string;
}

export const LogoWithText = ({
  width = 68,
  height = 94,
  mainTextClassName = 'text-custom-dark',
  subTextClassName = 'text-custom-txt-secondary',
  logoClassName = '-mt-5',
}: LogoWithTextProps) => {
  return (
    <div className="flex items-center">
      <CodeProjectLogo
        width={width}
        height={height}
        className={logoClassName}
      />
      <div className="flex flex-col justify-center ml-4">
        <h1 className={`text-xl ${mainTextClassName}`}>
          CODE <b className={`${mainTextClassName}`}>PROJECT</b>
        </h1>
        <p className={`text-xs ${subTextClassName}`}>For Those Who Code</p>
      </div>
    </div>
  );
};
