const PersonalInfoForm = ({ formData, onInputChange }) => {
  return (
    <div className="p-1">
      <h3 className="mb-3 text-sm font-semibold">Personal Information</h3>
      <div className="pl-0.5">
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className='block text-[12px] font-medium text-[#374151] mb-1'>Full Name *</label>
          <input
            type="text"
            placeholder="John Doe"
            className='px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]'
            value={formData?.fullName || ''}
            onChange={(e) => onInputChange('fullName', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className='block text-[12px] font-medium text-[#374151] mb-1'>Email *</label>
          <input
            type="email"
            placeholder="john.doe@example.com"
            className='px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]'
            value={formData?.email || ''}
            onChange={(e) => onInputChange('email', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className='block text-[12px] font-medium text-[#374151] mb-1'>Phone</label>
          <input
            type="tel"
            placeholder="1234567890"
            className='px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]'
            value={formData?.phone || ''}
            onChange={(e) => onInputChange('phone', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className='block text-[12px] font-medium text-[#374151] mb-1'>Location</label>
          <input
            type="text"
            placeholder="San Francisco, CA"
            className='px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]'
            value={formData?.location || ''}
            onChange={(e) => onInputChange('location', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className='block text-[12px] font-medium text-[#374151] mb-1'>LinkedIn</label>
          <input
            type="text"
            placeholder="linkedin.com/in/johndoe"
            className='px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]'
            value={formData?.linkedin || ''}
            onChange={(e) => onInputChange('linkedin', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className='block text-[12px] font-medium text-[#374151] mb-1'>Website/Portfolio</label>
          <input
            type="text"
            placeholder="johndoe.com"
            className='px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]'
            value={formData?.website || ''}
            onChange={(e) => onInputChange('website', e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[6px] mb-[10px] full-width">
        <label className='block text-[12px] font-medium text-[#374151] mb-1'>Professional Summary</label>
        <textarea
          placeholder="Brief professional summary highlighting your key skills and experience..."
          className='px-2.5 py-2 border text-sm rounded resize-none border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]'
          value={formData?.summary || ''}
          onChange={(e) => onInputChange('summary', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;