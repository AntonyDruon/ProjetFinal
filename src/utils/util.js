const toggleActiveMenu = (menuItems, url) =>
{
    const indexMenu = menuItems.indexOf(menuItems.find(menu => menu.path == url));
    menuItems[indexMenu].isActive = true;
    menuItems.filter(menu => menu.path != url).forEach(menu => menu.isActive = false);
}

export { toggleActiveMenu };