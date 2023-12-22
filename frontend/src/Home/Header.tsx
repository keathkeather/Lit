import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAccount } from './AccountContext';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<any>(null); // State to hold account details
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isHModalVisible, setHModalVisible] = useState(false);
  const [isAModalVisible, setAModalVisible] = useState(false);
  const [isSuModalVisible, setSuModalVisible] = useState(false);
  const [isSeModalVisible, setSeModalVisible] = useState(false);
  const allHModalVisible = isHModalVisible || isAModalVisible || isSuModalVisible || isSeModalVisible;

  useEffect(() => {
    const storedAccount = sessionStorage.getItem('account');
    if (storedAccount) {
      const parsedAccount = JSON.parse(storedAccount);
      setAccount(parsedAccount);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  //logout
  const handleLogoutClick = () => {
    sessionStorage.removeItem('userLoggedIn') //end session here
    sessionStorage.removeItem('account') //remove account from session storage
    navigate('/landing'); // then go back to landing page hehe
    console.log('Logged out successfully!');
  };

  const handleHelpClick = () => {
    console.log('Help link clicked!');

    if (account) {
      console.log(`passing ${account.firstName} to  help`);
      navigate(`/help/${account.accountId}`);
    } else {
      console.error('Account is null or undefined');
    }
  };

  const handleUserLogoClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleUserClick = () => {
    setHModalVisible(!isHModalVisible);
  };

  const handleAchievementsClick = () => {
    setAModalVisible(!isAModalVisible);
  };

  const handleSubscriptionClick = () => {
    setSuModalVisible(!isSuModalVisible);
  };

  const handleSettingsClick = () => {
    setSeModalVisible(!isSeModalVisible);
  };

  const closeModal = () => {
    if(isHModalVisible === true){
      setHModalVisible(false);
    }
    if(isAModalVisible === true){
      setAModalVisible(false);
    }
    if(isSuModalVisible === true){
      setSuModalVisible(false);
    }
    if(isSeModalVisible === true){
      setSeModalVisible(false);
    }
  };

  const handleBeAnAuthorClick = () => {
    console.log('Be An Author link clicked!');

    if (account) {
      console.log(`passing ${account.firstName} to Be An Author`);
      navigate(`/beanauthor/${account.accountId}`);
    } else {
      console.error('Account is null or undefined');
    }
  };

  return (
    <header className="bg-dblue fixed top-0 left-0 right-0 z-10 p-2 md:p-4 flex flex-row lg:flex-row items-center justify-between shadow-lg">
      <div className="flex items-center lg:ml-10">
        <button onClick={handleLogoClick}>
          <img src="/litimg/litlogo3.png" alt="Lit Logo 3" className="w-12 lg:w-20 md:w-40 mr-2 lg:ml-20" />
        </button>
        <ul className="flex">
          <li>
            <Link
              to="/userhome"
              className="text-base lg:text-lg font-bold text-white mr-3 md:mr-4 hover:text-bgc2"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/explore"
              className="text-base lg:text-lg font-bold text-white mr-3 md:mr-4 hover:text-bgc2"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to={account?.role.role_id === 2 ? '/authormylist' : '/mylist'}
              className="text-base lg:text-lg font-bold text-white mr-3 md:mr-4 hover:text-bgc2"
            >
              My List
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className="text-base lg:text-lg font-bold text-white hover:text-bgc2"
              onClick={handleHelpClick}
            >
              Help
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center mr-28">
        {loading ? (
          <div className="text-white text-lg font-bold mr-2"></div>
        ) : (
          account && (
            <div className="text-white text-lg font-bold mr-2" onClick={handleUserClick}>
              {account.firstName}
            </div>
          )
        )}
         <div className="relative">
          <button onClick={handleUserLogoClick}>
            <img src="/litimg/userlogo.svg" alt="User Logo" className="w-10 mr-2"/>
          </button>
          {isDropdownVisible && (
            <div className="absolute bg-white mt-4 rounded border" style={{width: '176px'}}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div onClick={handleUserClick} style={{ cursor: 'pointer', width: '176px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <button className="ml-2 mt-3 mb-3 text-sm font-bold flex flex-row items-center">
                    <svg className="w-4 h-4 text-black mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
                    </svg>
                    Profile
                  </button>
                </div>
                <div onClick={handleAchievementsClick} style={{ cursor: 'pointer', width: '176px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <button className="ml-2 mt-3 mb-3 text-sm font-bold flex flex-row items-center">
                    <svg className="w-4 h-4 text-black mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/>
                    </svg>
                    Achievements
                  </button>
                </div>
                <div className="text-sm" style={{ marginTop: '-16px' }}>______________________________</div>
                <div onClick={handleSubscriptionClick} style={{ cursor: 'pointer', width: '176px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <button className="ml-2 mt-3 mb-3 text-sm font-bold flex flex-row items-center">
                    <svg className="w-4 h-4 text-black mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                    </svg>
                    Subscription
                  </button>
                </div>
                <div className="text-sm" style={{ marginTop: '-16px' }}>______________________________</div>
                <div onClick={handleSettingsClick} style={{ cursor: 'pointer', width: '176px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <button className="ml-2 mt-3 mb-3 text-sm font-bold flex flex-row items-center">
                    <svg className="w-4 h-4 text-black mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="M19 11V9a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L12 2.757V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L2.929 4.343a1 1 0 0 0 0 1.414l.536.536L2.757 8H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535L8 17.243V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H18a1 1 0 0 0 1-1Z"/>
                        <path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      </g>
                    </svg>
                    Settings
                  </button>
                </div>
                <div className="text-sm" style={{ marginTop: '-16px' }}>______________________________</div>
                <div onClick={handleLogoutClick} style={{ cursor: 'pointer', width: '176px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <button className="ml-2 mt-3 mb-3 text-sm font-bold flex flex-row items-center">
                    <svg className="w-4 h-4 text-black mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"/>
                    </svg>
                    Log out
                  </button>
                </div>
                <div className="mb-3 text-sm" style={{ marginTop: '-16px' }}>______________________________</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {allHModalVisible && (
        <div className="header-overlay"></div>
      )}

      <style>
        {`
          .header-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10;
          }

          .header-modal {
            position: fixed;
            top: 35%;
            left: 35%;
            z-index: 11;
          }

          .header-modal-open {
            overflow: hidden;
          }
        `}
      </style>
      
      <div
      id="hpopup-modal"
      className={`header-modal ${isHModalVisible ? '' : 'hidden'}`}
      >
        <div className="w-full max-w-md max-h-full"
              style={{width: '500px'}}>
          <div className="relative bg-white border border-white rounded-lg">
            <button type="button" onClick={closeModal} className="absolute top-3 right-3">
              <img src="/litimg/x.png" alt="xbtn" className="w-7" />
            </button>
            <div className="flex flex-row items-center mt-5 ml-5">
              <div><img src="/litimg/profpic.png" alt="Profile Picture" className="w-32" /></div>
              <div className="flex flex-col ml-5">
                <div>
                  {loading ? (
                    <div className="text-black text-lg font-bold mr-2"></div>
                  ) : (
                    account && (
                      <div className="text-black text-lg font-bold mr-2">
                        {`${account.firstName} ${account.lastName}`}
                      </div>
                    )
                  )}
                </div>
                <div>
                  {loading ? (
                    <div className="text-black text-lg font-bold mr-2"></div>
                  ) : (
                    account && (
                      <div className="text-black text-lg font-bold mr-2">
                        {`${account.email}`}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-5 mb-5">
              <div className="flex flex-row items-center mb-5">
                <button className="mr-5" style={{ textDecoration: 'underline', textUnderlineOffset: '0.3em' }}>
                  Profile
                </button>
                <button onClick={() => { handleUserClick(); handleAchievementsClick(); }} className="mr-5">
                  Achievements
                </button>
                <button onClick={() => { handleUserClick(); handleSubscriptionClick(); }} className="mr-5">
                  Subscription
                </button>
                <button onClick={() => { handleUserClick(); handleSettingsClick(); }}>
                  Settings
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div
      id="apopup-modal"
      className={`header-modal ${isAModalVisible ? '' : 'hidden'}`}
      >
        <div className="w-full max-w-md max-h-full"
              style={{width: '500px'}}>
          <div className="relative bg-white border border-white rounded-lg">
            <button type="button" onClick={closeModal} className="absolute top-3 right-3">
              <img src="/litimg/x.png" alt="xbtn" className="w-7" />
            </button>
            <div className="flex flex-row items-center mt-5 ml-5">
              <div><img src="/litimg/profpic.png" alt="Profile Picture" className="w-32" /></div>
              <div className="flex flex-col ml-5">
                <div>
                  {loading ? (
                    <div className="text-black text-lg font-bold mr-2"></div>
                  ) : (
                    account && (
                      <div className="text-black text-lg font-bold mr-2">
                        {`${account.firstName} ${account.lastName}`}
                      </div>
                    )
                  )}
                </div>
                <div>
                  {loading ? (
                    <div className="text-black text-lg font-bold mr-2"></div>
                  ) : (
                    account && (
                      <div className="text-black text-lg font-bold mr-2">
                        {`${account.email}`}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-5 mb-5">
              <div className="flex flex-row items-center mb-5">
                <button onClick={() => { handleAchievementsClick(); handleUserClick(); }} className="mr-5">
                  Profile
                </button>
                <button className="mr-5" style={{ textDecoration: 'underline', textUnderlineOffset: '0.3em' }}>
                  Achievements
                </button>
                <button onClick={() => { handleAchievementsClick(); handleSubscriptionClick(); }} className="mr-5">
                  Subscription
                </button>
                <button onClick={() => { handleAchievementsClick(); handleSettingsClick(); }}>
                  Settings
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div
      id="supopup-modal"
      className={`header-modal ${isSuModalVisible ? '' : 'hidden'}`}
      >
        <div className="w-full max-w-md max-h-full"
              style={{width: '500px'}}>
          <div className="relative bg-white border border-white rounded-lg">
            <button type="button" onClick={closeModal} className="absolute top-3 right-3">
              <img src="/litimg/x.png" alt="xbtn" className="w-7" />
            </button>
            <div className="flex flex-row items-center mt-5 ml-5">
              <div><img src="/litimg/profpic.png" alt="Profile Picture" className="w-32" /></div>
              <div className="flex flex-col ml-5">
                <div>
                  {loading ? (
                    <div className="text-black text-lg font-bold mr-2"></div>
                  ) : (
                    account && (
                      <div className="text-black text-lg font-bold mr-2">
                        {`${account.firstName} ${account.lastName}`}
                      </div>
                    )
                  )}
                </div>
                <div>
                  {loading ? (
                    <div className="text-black text-lg font-bold mr-2"></div>
                  ) : (
                    account && (
                      <div className="text-black text-lg font-bold mr-2">
                        {`${account.email}`}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-5 mb-5">
              <div className="flex flex-row items-center mb-5">
                <button onClick={() => { handleSubscriptionClick(); handleUserClick(); }} className="mr-5">
                  Profile
                </button>
                <button onClick={() => { handleSubscriptionClick(); handleAchievementsClick(); }} className="mr-5">
                  Achievements
                </button>
                <button className="mr-5" style={{ textDecoration: 'underline', textUnderlineOffset: '0.3em' }}>
                  Subscription
                </button>
                <button onClick={() => { handleSubscriptionClick(); handleSettingsClick(); }}>
                  Settings
                </button>
              </div>
              
              <div>
                <Link
                    to="/subscription"
                    type="button"
                    className="mt-5 px-32 py-2 bg-bgc2 text-white font-semibold cursor-pointer text-sm"
                    onClick={() => { handleSubscriptionClick(); handleBeAnAuthorClick(); }}
                  >
                  Manage Subscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
      id="sepopup-modal"
      className={`header-modal ${isSeModalVisible ? '' : 'hidden'}`}
      >
        <div className="w-full max-w-md max-h-full"
              style={{width: '500px'}}>
          <div className="relative bg-white border border-white rounded-lg">
            <button type="button" onClick={closeModal} className="absolute top-3 right-3">
              <img src="/litimg/x.png" alt="xbtn" className="w-7" />
            </button>
            <div className="flex flex-row items-center mt-5 ml-5">
              <div><img src="/litimg/profpic.png" alt="Profile Picture" className="w-32" /></div>
              <div className="flex flex-col ml-5">
                <div>
                  {loading ? (
                    <div className="text-black text-lg font-bold mr-2"></div>
                  ) : (
                    account && (
                      <div className="text-black text-lg font-bold mr-2">
                        {`${account.firstName} ${account.lastName}`}
                      </div>
                    )
                  )}
                </div>
                <div>
                  {loading ? (
                    <div className="text-black text-lg font-bold mr-2"></div>
                  ) : (
                    account && (
                      <div className="text-black text-lg font-bold mr-2">
                        {`${account.email}`}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-5 mb-5">
              <div className="flex flex-row items-center mb-5">
                <button onClick={() => { handleSettingsClick(); handleUserClick(); }} className="mr-5">
                  Profile
                </button>
                <button onClick={() => { handleSettingsClick(); handleAchievementsClick(); }} className="mr-5">
                  Achievements
                </button>
                <button onClick={() => { handleSettingsClick(); handleSubscriptionClick(); }} className="mr-5">
                  Subscription
                </button>
                <button style={{ textDecoration: 'underline', textUnderlineOffset: '0.3em' }}>
                  Settings
                </button>
              </div>
              
              <div>
                <Link
                  to="/beanauthor"
                  type="button"
                  className="mt-5 px-40 py-2 bg-bgc2 text-white font-semibold cursor-pointer text-sm"
                  onClick={() => { handleSettingsClick(); handleBeAnAuthorClick(); }}
                >
                  Be an Author
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
