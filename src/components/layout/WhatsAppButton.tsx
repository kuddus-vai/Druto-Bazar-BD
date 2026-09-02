/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/8801806578737?text=Hello%20Drutho%20Bazar%20BD,%20I%20want%20to%20order%20groceries%20or%20inquire%20about%20products."
        target="_blank"
        rel="noopener noreferrer"
        id="btn-floating-whatsapp"
        className="group bg-green-600 hover:bg-green-500 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-xl shadow-green-600/30 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95"
        title="হোয়াটসঅ্যাপে সরাসরি কথা বলুন বা অর্ডার দিন"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline font-bold text-xs">হোয়াটসঅ্যাপ সাপোর্ট</span>
      </a>

      {/* Floating Quick Call Button */}
      <a
        href="tel:01806578737"
        id="btn-floating-call"
        className="bg-emerald-800 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg border border-emerald-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 sm:hidden"
        title="সরাসরি কল করুন"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};
