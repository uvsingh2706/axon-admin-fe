function AvatarIcon  ({className}: {className?: string})  {
    return (
        <div>
            <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99999 7.99967C9.84094 7.99967 11.3333 6.50729 11.3333 4.66634C11.3333 2.82539 9.84094 1.33301 7.99999 1.33301C6.15904 1.33301 4.66666 2.82539 4.66666 4.66634C4.66666 6.50729 6.15904 7.99967 7.99999 7.99967Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.7267 14.6667C13.7267 12.0867 11.16 10 8.00001 10C4.84001 10 2.27335 12.0867 2.27335 14.6667" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    )
}

export default AvatarIcon;