import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">LifeSync</h3>
            <p className="text-sm">Sync your life, boost your productivity.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-purple-400 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-purple-400 transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-purple-400 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-purple-400 transition duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tasks" className="text-sm hover:text-purple-400 transition duration-300">
                  Task Management
                </Link>
              </li>
              <li>
                <Link href="/habits" className="text-sm hover:text-purple-400 transition duration-300">
                  Habit Tracking
                </Link>
              </li>
              <li>
                <Link href="/wellness" className="text-sm hover:text-purple-400 transition duration-300">
                  Mental Wellness
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-sm hover:text-purple-400 transition duration-300">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-purple-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.995 17.176c-.424.097-.863.16-1.313.16-5.454 0-9.88-4.425-9.88-9.88 0-.45.063-.889.16-1.313L7.84 5.14C6.705 6.462 6 8.18 6 10.068 6 14.36 9.64 18 13.932 18c1.888 0 3.606-.705 4.928-1.84l-1.865-1.984zM16.657 6l-1.984-1.865C13.351 3.705 11.633 3 9.745 3 5.453 3 1.813 6.64 1.813 10.932c0 1.888.705 3.606 1.84 4.928L5.14 14.16c-.097-.424-.16-.863-.16-1.313 0-5.454 4.425-9.88 9.88-9.88.45 0 .889.063 1.313.16L16.657 6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-sm text-center">
          © {new Date().getFullYear()} LifeSync. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

