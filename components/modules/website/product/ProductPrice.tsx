import { discountPrice } from '@/lib/utils'
import { Option } from '@/types'
import React from 'react'

export default function ProductPrice({option}: {option: Option}) {
  return (
    <div className='flex gap-2 flex-col'>
        <div className="flex items-center gap-8">
            <div className="text-primary-700 tracking-widest font-bold">
                    ${option.discount > 0 ?
                    discountPrice(option.price, option.discount) : option.price }
            </div>
        </div>
    </div>
  )
}
