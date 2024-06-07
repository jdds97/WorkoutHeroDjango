'use client';
import React from 'react';

import {UserSession} from 'auth';
import {useSession} from 'next-auth/react';
import Image from 'next/image';

import {MoonIcon} from '@/public/MoonIcon';
import {SunIcon} from '@/public/SunIcon';

import {Switch} from '@nextui-org/switch';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from '@nextui-org/navbar';
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from '@nextui-org/dropdown';
import {Avatar} from '@nextui-org/avatar';

import CustomLink from '@/components/ui/custom-link';
import {SignIn} from './auth-components';

const navigation = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Rutinas',
        href: '/rutinas',
    },
    {
        name: 'Ejercicios',
        href: '/ejercicios',
    },
];

export default function MainNav() {
    const {data} = useSession();
    const session: UserSession | null = data;

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar
            className="bg-primary"
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Cerrar menú' : 'ABrir menú'} />
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand className="h-100">
                    <CustomLink href="/">
                        <Image src={'/logo.svg'} alt="logo" width={200} height={150} />
                    </CustomLink>
                </NavbarBrand>
                {navigation.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <CustomLink className="hover:text-secondary" href={item.href}>
                            {item.name}
                        </CustomLink>
                    </NavbarItem>
                ))
                }
            </NavbarContent>
            <NavbarMenu>
                {navigation.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <CustomLink className="hover:text-secondary" href={item.href}>
                            {item.name}
                        </CustomLink>
                    </NavbarMenuItem>
                ))
                }
            </NavbarMenu>
            <NavbarContent justify="end">
                <Switch
                    defaultSelected
                    size="md"
                    color="warning"
                    startContent={<SunIcon />}
                    endContent={<MoonIcon />}
                    onChange={(checked: any) => {
                        if (checked) {
                            document.documentElement.classList.toggle('dark');
                        }
                        else {
                            document.documentElement.classList.remove('dark');
                        }
                    }
                    }
                >
                    Dark mode
                </Switch>
                {session?.user ?
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="h-12 w-12 justify-center items-center position-auto"
                                src={session?.user?.imagen}
                                alt="Usuario"
                                color="warning"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Iniciado sesión con </p>
                                <p className="font-semibold">{session?.user?.first_name}</p>
                            </DropdownItem>
                            <DropdownItem key="rutinas" href="/rutinas">
                                Mis rutinas
                            </DropdownItem>
                            <DropdownItem key="ejercicios" href="/ejercicios">
                                Mis ejercicios
                            </DropdownItem>
                            <DropdownItem key="logout" href="/auth/signout" color="danger">
                                Cerrar sesión
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    <SignIn/>
                }
            </NavbarContent>
        </Navbar>
    );
}
