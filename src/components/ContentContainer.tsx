import { FC } from 'react';
import Link from "next/link";

export const ContentContainer: FC = props => {
  return (
    <div className="flex-1 drawer h-52">
      {/* <div className="h-screen drawer drawer-mobile w-full"> */}
      <input id="my-drawer" type="checkbox" className="grow drawer-toggle" />
      <div className="items-center drawer-content h-full">
        {props.children}
      </div>

      {/* SideBar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
          <li>
          <Link href="https://github.com/ilovespectra/solo">
            <a target="_blank" rel="noopener noreferrer">github</a>
          </Link>
          </li>
          <li>
            <Link href="https://www.solarplex.xyz/profile/solo.live.solarplex.xyz">
              <a target="_blank" rel="noopener noreferrer">solarplex</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
