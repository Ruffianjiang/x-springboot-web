// Sidebar/menu color + layout constants exposed to JS.
// Under Vite/Rolldown a plain .scss has no JS default export, so the
// webpack `:export` magic from variables.scss is mirrored here as a real
// ES module. Keep the values in sync with src/styles/variables.scss.
const variables = {
  menuText: '#bfcbd9',
  menuActiveText: '#409EFF',
  subMenuActiveText: '#f4f4f5',
  menuBg: '#304156',
  menuHover: '#263445',
  subMenuBg: '#1f2d3d',
  subMenuHover: '#001528',
  sideBarWidth: '210px'
}

export default variables
