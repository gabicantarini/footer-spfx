import { sp } from '@pnp/sp';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { IBlockedItem, IListItemFooter } from './Entities';
import './Footer.scss';

export const Footer: React.FunctionComponent = () => {
  const [listFooter, setFooter] = useState<IBlockedItem>({});
  const [hide, setHide] = useState<boolean>(true);
  const [isAside, setIsAside] = useState<boolean>(false);

  //const context: IFooterProps = useContext("");
  const s4WorkspaceContainer: HTMLDivElement = document.getElementById('s4-workspace') as HTMLDivElement;

  const getCurrentYear: () => number = (): number => {
    return new Date().getFullYear();
  };

  const scrollTop: () => void = (): void => {
    s4WorkspaceContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleGoTopBtnVisibility: () => void = (): void => {
    const headerHeight: number = 88;
    const bannerHeight: number = 440;
    setHide(s4WorkspaceContainer.scrollTop <= headerHeight + bannerHeight);
  };

  const isScrollableFn: () => void = (): void => {
    const mainDiv: HTMLElement = document.getElementById('s4-workspace');
    const hasScrollableContent: boolean = mainDiv.scrollHeight > mainDiv.clientHeight;
    const overflowYStyle: string = window.getComputedStyle(mainDiv).overflowY;
    const isOverflowHidden: boolean = overflowYStyle.indexOf('hidden') !== -1;
    setIsAside(hasScrollableContent && !isOverflowHidden);
  };

  useEffect(() => {
    setTimeout(() => {
      isScrollableFn();
    }, 200);

    sp.site.rootWeb
      .getList(`${context.wpContext.pageContext.site.serverRelativeUrl}Lists/ANF_Footer`)
      .select('Title', 'ANF_Description', 'ANF_Group', 'ANF_Link')
      .items.get()
      .then((spItems) => {
        const listItems: IListItemFooter[] = spItems.map((item) => {
          return {
            title: item.Title,
            description: item.ANF_Description,
            group: item.ANF_Group,
            link: item.ANF_Link ? item.ANF_Link.Url : ''
          };
        });

        const blockedItems: IBlockedItem = {};

        listItems.map((item) => {
          if (!blockedItems[item.group]) {
            blockedItems[item.group] = [];
          }
          blockedItems[item.group].push(item);
        });
        setFooter(blockedItems);
      })
      .catch((error: Error) => {
        console.error('Erro in get Footer', error);
      });

    s4WorkspaceContainer.addEventListener('scroll', handleGoTopBtnVisibility, true);
  }, []);

  return (
    <footer className='footer footer-style'>
      <div className='container-lg'>
        <div className='footer-content'>
          <div className='footer-leftSide'>
            <div className='footer-footerLinks'>
              {listFooter &&
                Object.keys(listFooter).map((groupName, groupIndex) => {
                  return (
                    <div key={groupIndex}>
                      {groupName.length > 0 &&
                        listFooter[groupName].map((item, index) => (
                          <a href={item.link} key={index}>
                            <span>{item.title}</span>
                          </a>
                        ))}
                    </div>
                  );
                })}
              <div className='helpSection'>
                <h2>Ajude-nos a melhorar!</h2>
                <p>A sua opinião é importante. Partilhe os seus comentários sobre o portal ANFOnline.</p>
                <div className='helpSection-button'>
                  <i className='fal fa-envelope'></i>
                  <span>Enviar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-image-mobile'>
          <img src='/Style%20Library/ANF/static/images/footer/footer_image_mobile.svg' alt='footer bg' />
        </div>
        <div className='footer-copyright'>
          ©{getCurrentYear()} ASSOCIAÇÃO NACIONAL DAS FARMÁCIAS. Todos os direitos reservados.
        </div>
      </div>
      <div className='footer-image-desktop'>
        <img src='/Style%20Library/ANF/static/images/footer/footer_image_desktop.svg' alt='footer bg' />
      </div>
      <div
        className={`footer-go-top${hide ? ' hide' : ''}${isAside ? ' isAside' : ''}`}
        onClick={() => scrollTop()}
        role='button'
      >
        <i className='fal fa-arrow-to-top'></i>
      </div>
    </footer>
  );
};
