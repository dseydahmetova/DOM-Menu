// DOM MENU PART1

const mainEl = document.querySelector('main')
mainEl.style.backgroundColor = 'var(--main-bg)';

const h1Tag = document.createElement('h1')

h1Tag.textContent = 'SEI Rocks!'
mainEl.appendChild(h1Tag)

mainEl.classList.add('flex-ctr')

const topMenuEl = document.querySelector('#top-menu')
topMenuEl.style.height = '100%'
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'
topMenuEl.classList.add('flex-around')

// 5.0 Update the menuLinks
var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];

menuLinks.forEach((link) => {
  const aTag = document.createElement('a');
  aTag.href = link.href
  aTag.textContent = link.text
  topMenuEl.appendChild(aTag)
})


// DOM MENU PART2

//Task 4.0 - 4.5 Select and cache the <nav id="sub-menu"> element in subMenuEl and add some CSS styles

let subMenuEl = document.querySelector('#sub-menu')
subMenuEl.style.height = '100%'
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'
subMenuEl.classList.add('flex-around')
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0'

// 5.1 select and cache all <a> inside topMenuEl 
const topMenuLinks = topMenuEl.childNodes
//const topMenuLinks = querySelectorAll('#top-menu a')

let showingSubMenu = false
let subLink;

//5.2 Attach event listener to topMenuEl
topMenuEl.addEventListener('click', function(event) {
  event.preventDefault()
  const targetEl = event.target

  //checks if the clicked element is <a>
  if (targetEl.localName !== "a") {
    return
  } else {
    console.log(targetEl.textContent)
    //5.3 check if <a> has class of 'active'
    if (targetEl.classList.contains('active')) {
      targetEl.classList.remove('active')
      showingSubMenu = false
      subMenuEl.style.top = 0
      return
    }
    //5.4 removes all 'active' class name
    topMenuLinks.forEach(item => {
      item.classList.remove('active')
    })
    //5.5 add class 'active'
    targetEl.classList.add('active')
  }
  //5.6 checks if cliked <a> link has sublink
  menuLinks.forEach(link => {
    if (targetEl.textContent === link.text) {
      if (link.subLinks) {
        showingSubMenu = true
        subLink = link.subLinks
        console.log(subLink)
      } else {
        showingSubMenu = false
      }
    }
  })
  //5.7 if showingSubMenu is true, call the function 
  if (showingSubMenu === true) {
    buildSubMenu(subLink)
    subMenuEl.style.top = '100%'
  } else {
    subMenuEl.style.top = '0'
    //6.4 if ABOUT clicked <h1>about<h1> displayed
    h1Tag.textContent = targetEl.textContent
    mainEl.appendChild(h1Tag)
  }
})

//5.8 create a function
function buildSubMenu(arr) {
  subMenuEl.innerHTML = ''
  arr.forEach(item => {
    const a = document.createElement('a')
    a.href = item.href
    a.textContent = item.text
    subMenuEl.appendChild(a)
    console.log(arr)
  })

}
//6.0 attach event listener to subMenuEl and check if clicked element is <a>
subMenuEl.addEventListener('click', function(event) {
  event.preventDefault()
  if (event.target.localName !== "a") {
    return
  } else {
    console.log(event.target.textContent)
  }
  //6.1 set the values
  showingSubMenu = false
  subMenuEl.style.top = '0'
  //6.2 remove class 'active'
  topMenuLinks.forEach(link => {
    link.classList.remove('active')
  })
  //6.3 update mainEl content with the clicked element content
  h1Tag.textContent = event.target.textContent
  mainEl.appendChild(h1Tag)
})


