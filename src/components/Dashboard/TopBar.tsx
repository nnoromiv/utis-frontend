"use client"

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultCity } from '@/store/locationSlice'
import { RootState } from '@/store'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useQuery } from '@tanstack/react-query'
import { getAllCity } from '@/lib/weather_api'

const TopBar = () => {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.location.defaultCity);

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getAllCity,
  });

  const selectOption = (value: string) => {
    if (value === "") {
      dispatch(setDefaultCity("London"))
      return
    }

    dispatch(setDefaultCity(value))
  }

  return (
    <div className='w-full flex gap-60 max-lg:gap-20 max-md:gap-5 justify-between'>
      <div className='w-full flex gap-3'>
        {
          isLoading ?
            <div
              className="h-[50px] w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            />
            :
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered"> Current City - {city} </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {data.map((item: string, index: number) => (
                  <DropdownItem key={index} onClick={() => selectOption(item)}>{item}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
        }
      </div>

      <div className='flex items-end gap-5'>
        <Tooltip content="Download data">
          <FontAwesomeIcon
            icon={faDownload}
            className='cursor-pointer text-amber-900'
            onClick={() => console.log('Downloading')}
          />
        </Tooltip>

        <Tooltip content="Refresh dashboard">
          <FontAwesomeIcon
            icon={faRefresh}
            className='cursor-pointer text-success'
            onClick={() => console.log('Refreshing')}
          />
        </Tooltip>

      </div>
    </div>
  )
}

export default TopBar