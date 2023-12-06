import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAccount } from './AccountContext';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { account } = useAccount();
  const [loading, setLoading] = useState(true);
  const [isHModalVisible, setHModalVisible] = useState(false);
  const [isAModalVisible, setAModalVisible] = useState(false);
  const [isSuModalVisible, setSuModalVisible] = useState(false);
  const [isSeModalVisible, setSeModalVisible] = useState(false);
  const allHModalVisible = isHModalVisible || isAModalVisible || isSuModalVisible || isSeModalVisible;

  useEffect(() => {
    if (account) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [account]);

  const handleLogoClick = () => {
    navigate('/');
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
              to="/mylist"
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
      <div className="flex items-center">
        {loading ? (
          <div className="text-white text-lg font-bold mr-2"></div>
        ) : (
          account && (
            <div className="text-white text-lg font-bold mr-2" onClick={handleUserClick}>
              {account.firstName}
            </div>
          )
        )}
        <button onClick={handleUserClick}>
          <img src="/litimg/userlogo.svg" alt="User Logo" className="w-10 mr-32" />
        </button>
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
              You're in Profile.
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
              You're in Achievements.
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
              You're in Subscription.
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
              You're in Settings.
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
