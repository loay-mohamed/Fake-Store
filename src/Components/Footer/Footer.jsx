import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-slate-200 text-black py-6">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
