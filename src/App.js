import { createElement, Fragment, useState, createRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css';


const widthDrawer = '250px'
const listMenu = [
  { NameMenu: 'Dashboard', path: '/dashboard' },
  {
    NameMenu: 'Master',
    Items: [
      { NameMenu: 'Product', path: '/product' },
      { NameMenu: 'Customer', path: '/customer' },
      { NameMenu: 'Supplier', path: '/supplier' }
    ]
  },
  { NameMenu: 'Trasnaction' },
  { NameMenu: 'Report' },
]
function disableActiveListMenu() {
  const element = document.querySelectorAll('.item-menu-custom1');
  for (let i = 0; i < element.length; i++) {
    element[i].classList.remove('active')
  }
}
function AppSideBar({ children }) {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  const handleClick = (status) => {
    setOpen(status)
  }

  const listMenuChild = (itemsMenu) => {

    return <Fragment>
      <div className='list-group' aria-label='list-menu'>
        {itemsMenu.map((item, index) => {
          const element = createRef()
          let clickListener = () => { }
          if (item.path != undefined) {
            clickListener = () => {
              disableActiveListMenu()
              element.current.classList.add('active')
              navigate(item.path)
            }
          }
          return <div ref={element} key={index} className='item-menu-custom1 list-group-item list-group-item-action border-0' style={{ cursor: 'pointer' }} onClick={clickListener}>
            <b className='ms-4'>{item.NameMenu}</b>
          </div>
        })}
      </div>
    </Fragment>
  }

  return <div className='d-flex' style={{ height: '100vh' }}>
    <div className='border border-1' aria-label='sidebar' style={{
      width: widthDrawer,
      // backgroundColor: 'blue',
      marginLeft: (open) ? '0px' : '-' + widthDrawer,
      transition: 'all 0.2s'
    }}>
      <div className='p-3'>
        <div className='mb-1' style={{ padding: '8px' }} aria-label='main-title'>
          Main Menu
        </div>
        <div className='list-group' aria-label='list-menu'>
          {listMenu.map((item, index) => {
            const itemsMenu = item.Items || []
            if (itemsMenu.length > 0) {
              // with child node
              const idCollapce = `menu-collapse-${item.NameMenu.trim()}`
              return <Fragment key={index}>
                <button className='list-group-item list-group-item-action border-0' data-bs-toggle="collapse" data-bs-target={`#${idCollapce}`} >
                  <div className='d-flex align-items-center'>
                    <span class="material-symbols-outlined me-2">
                      check_circle
                    </span>
                    <b>{item.NameMenu}</b>
                  </div>
                </button>
                <div className="collapse" id={idCollapce}>
                  {listMenuChild(itemsMenu)}
                </div>
              </Fragment>
            } else {
              const element = createRef()
              let clickListener = () => { }
              if (item.path != undefined) {
                clickListener = () => {
                  disableActiveListMenu()
                  element.current.classList.add('active')
                  navigate(item.path)
                }
              }
              return <div ref={element} key={index} className='item-menu-custom1 list-group-item list-group-item-action border-0' style={{ cursor: 'pointer' }} onClick={clickListener}>
                <div className='d-flex align-items-center'>
                  <span class="material-symbols-outlined me-2">
                    check_circle
                  </span>
                  <b>{item.NameMenu}</b>
                </div>
              </div>
            }
          })}
        </div>
      </div>
    </div>
    <div className='flex-grow-1' aria-label='main'>
      <div className='bg-light border border-1 d-flex align-items-center p-2' aria-label='navbar'>
        <div className='flex-grow-1'>
          <button className='btn btn-light d-flex p-2' style={{ borderWidth: '0px' }} onClick={() => handleClick(!open)}>
            <span className="material-symbols-outlined">
              menu
            </span>
          </button>
        </div>

        <div className='d-flex'>
          <button className='btn btn-light d-flex p-2 me-2' style={{ borderWidth: '0px' }}>
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>
          <img src="https://miro.medium.com/fit/c/176/176/0*jkljDcqSZkRzPWIN" className="rounded" alt="..." style={{ height: '40px' }} />
        </div>
      </div>
      {children}
    </div>
  </div>
}

function AppLogin() {
  const navigate = useNavigate()
  return <div className='d-flex justify-content-center align-items-start pt-5 pb-5 ps-2 pe-2 background-default' style={{ height: '100vh' }}>
    <div className='card shadow-sm border border-0' style={{ width: '500px' }}>
      <div className='card-body p-5'>
        <h4 className='text-center'>Login</h4>
        <label>Email</label>
        <input type='text' className='form-control mb-3 form-control-lg' placeholder='masukan email anda'></input>
        <label>Password</label>
        <input type='password' className='form-control form-control-lg' placeholder='masukan password anda'></input>
        <button className='btn btn-primary btn-lg mt-4' style={{ width: '100%' }}>Login</button>
        <div className='d-flex justify-content-between mt-4'>
          <div>Belum Punya Akun ?  <Link to="/register">Daftar</Link></div>
          <a href='#'>Lupa Password ?</a>
        </div>
      </div>
    </div>
  </div>
}

function AppRegister() {
  return <div className='d-flex justify-content-center align-items-start pt-5 pb-5 ps-2 pe-2 background-default' style={{ height: '100vh' }}>
    <div className='card shadow-sm border border-0' style={{ width: '500px' }}>
      <div className='card-body p-5'>
        <h4 className='text-center'>Daftar</h4>
        <label>Nama Pengguna</label>
        <input type='text' className='form-control mb-3 form-control-lg' placeholder='masukan nama anda'></input>
        <label>Email</label>
        <input type='text' className='form-control mb-3 form-control-lg' placeholder='masukan email anda'></input>
        <label>Password</label>
        <input type='password' className='form-control mb-3 form-control-lg' placeholder='masukan password anda'></input>
        <label>Ketik Ulang Password</label>
        <input type='password' className='form-control form-control-lg' placeholder='masukan ulang password anda'></input>
        <button className='btn btn-primary btn-lg mt-4' style={{ width: '100%' }}>Login</button>
        <div className='d-flex justify-content-center mt-4'>
          <div>Sudah Punya Akun ? <Link to="/login">Login</Link></div>
          {/* <a href='#'>Lupa Password?</a> */}
        </div>
      </div>
    </div>
  </div>
}

function MainProduct() {
  return <div>
    Product
  </div>
}

function AppMain() {
  return <div>
    <Routes>
      <Route path='product' element={<MainProduct />}></Route>
    </Routes>
  </div>
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={
            <AppSideBar>
              <AppMain />
            </AppSideBar>
          } />
          <Route path="/login" element={<AppLogin />} />
          <Route path="/register" element={<AppRegister />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
