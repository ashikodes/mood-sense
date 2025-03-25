import Image from 'next/image';
import './Header.scss';
import logo from '@/public/images/logo.png';

export function Header() {
  return (
    <div className='header-container'>
      <div className='header-logo-name'>
        <Image src={logo} alt='logo' width={24} height={24} />
        <span className='header-name'>MoodSense</span>
      </div>
    </div>
  );
}