

function Download({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M7.76672 9.73242L9.90006 11.8658L12.0334 9.73242"
                stroke="#FE6A00"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.90002 3.33398V11.809"
                stroke="#FE6A00"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.6667 10.1504C16.6667 13.8337 14.1667 16.8171 10 16.8171C5.83337 16.8171 3.33337 13.8337 3.33337 10.1504"
                stroke="#FE6A00"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default Download;