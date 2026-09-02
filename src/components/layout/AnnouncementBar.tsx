/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Truck, ShieldCheck, Sparkles, Code2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { setActiveModal } = useStore();

  return (
    <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-3 sm:px-6 border-b border-emerald-800/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Hotline and helpline */}
        <div className="flex items-center gap-4 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <a
            href="tel:01806578737"
            id="announcement-phone-link"
            className="inline-flex items-center gap-1.5 font-medium text-emerald-200 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>হটলাইন: <strong>০১৮০৬-৫৭৮৭৩৭</strong></span>
          </a>
          <span className="hidden md:inline text-emerald-600">|</span>
          <div className="inline-flex items-center gap-1.5 text-emerald-200">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>৳১৫০০+ অর্ডারে সারাদেশে <strong>ফ্রি হোম ডেলিভারি</strong></span>
          </div>
        </div>

        {/* Right: Assurance & Testing Suite Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>১০০% খাঁটি পণ্যের নিশ্চয়তা ও ক্যাশ অন ডেলিভারি</span>
          </div>
          
          {/* Unit Testing Suite Button */}
          <button
            onClick={() => setActiveModal('test-runner')}
            id="btn-open-test-runner"
            className="inline-flex items-center gap-1 bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 px-2.5 py-1 rounded text-[11px] font-medium border border-emerald-600/60 shadow-sm transition-all hover:scale-105 cursor-pointer"
            title="রান করুন স্বয়ংক্রিয় ইউনিট টেস্ট স্যুট"
          >
            <Code2 className="w-3 h-3 text-emerald-300" />
            <span>সিস্টেম ইউনিট টেস্ট</span>
            <span className="bg-emerald-500 text-emerald-950 text-[9px] px-1 rounded-full font-bold">১০/১০</span>
          </button>
        </div>
      </div>
    </div>
  );
};
