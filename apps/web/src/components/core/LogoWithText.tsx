import CodeProjectLogo from '@src/assets/icons/CodeProjectLogo';

interface LogoWithTextProps {
  width?: number;
  height?: number;
  logoClassName?: string;
  mainTextClassName?: string;
  subTextClassName?: string;
  withText?: boolean;
}

export const LogoWithText = ({
  width = 68,
  height = 94,
  mainTextClassName = 'text-dark',
  subTextClassName = 'text-txt-secondary',
  logoClassName = '-mt-5',
  withText = true,
}: LogoWithTextProps) => {
  return (
    <div className="flex items-center">
      <CodeProjectLogo
        width={width}
        height={height}
        className={logoClassName}
      />
      {withText && (
        <div className="flex flex-col justify-center ml-4">
          <h1 className={`text-xl ${mainTextClassName}`}>
            CODE <b className={`${mainTextClassName}`}>PROJECT</b>
          </h1>
          <p className={`text-xs ${subTextClassName}`}>For Those Who Code</p>
        </div>
      )}
    </div>
  );
};
