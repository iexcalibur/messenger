import getCurrentUser from '@/app/actions/getCurrentUser';

import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';

async function Sidebar({ children }: {
  children: React.ReactNode,
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      {/*Hook desktop and mobile footer using useRoute */}
      <DesktopSidebar currentUser={currentUser!}/>
      <MobileFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;
//After adding ! this we can allow user to be null

