import { AlertCircle} from 'lucide-react';
const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  required = false,
  error = "",
  options = [] 
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6A8C20] w-5 h-5" />
      )}
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#6A8C20] focus:border-[#6A8C20] outline-none transition-all ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[#ADD90D]'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#6A8C20] focus:border-[#6A8C20] outline-none transition-all resize-none ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[#ADD90D]'
          }`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#6A8C20] focus:border-[#6A8C20] outline-none transition-all ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[#ADD90D]'
          }`}
        />
      )}
    </div>
    {error && (
      <p className="text-red-500 text-sm flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

export default InputField;