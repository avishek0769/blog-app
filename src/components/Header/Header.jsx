import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index.js'

function Header() {
    const authStatus = useSelector(state => state.auth.status)
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Sign up",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "Log in",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Posts",
            slug: "/add-post",
            active: authStatus
        }
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map(item => item.active? (
                            <li key={item.name} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                <NavLink to={`${item.slug}`} className={({isActive}) => `${isActive? "text-black font-bold" : "text-gray-700"}`} > {item.name}</NavLink>
                            </li>
                        ): null)}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
