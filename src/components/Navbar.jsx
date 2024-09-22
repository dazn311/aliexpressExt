import NavbarItem from './NavbarItem';

export default function Navbar() {
  return (
    <div className='flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6'>
      <NavbarItem title='iPad' param='iPad' />
      <NavbarItem title='iphone' param='iPhone' />
    </div>
  );
}
