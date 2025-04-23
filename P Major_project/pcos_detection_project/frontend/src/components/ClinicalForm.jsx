import React, { useState } from 'react';

const ClinicalForm = ({ onFormSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    'Weight (Kg)': '',
    'Cycle(R/I)': '',
    'Cycle length(days)': '',
    'beta-HCG(mIU/mL)': '',
    'FSH(mIU/mL)': '',
    'LH(mIU/mL)': '',
    'FSH/LH': '',
    'Hip(inch)': '',
    'TSH (mIU/L)': '',
    'AMH(ng/mL)': '',
    'PRL(ng/mL)': '',
    'Vit D3 (ng/mL)': '',
    'Weight gain(Y/N)': '0',
    'hair growth(Y/N)': '0',
    'Skin darkening (Y/N)': '0',
    'Fast food (Y/N)': '0',
    'Follicle No. (L)': '',
    'Follicle No. (R)': '',
    'Avg. F size (L) (mm)': '',
    'Avg. F size (R) (mm)': ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For checkbox inputs, convert to 0/1
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked ? '1' : '0'
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string values to appropriate types
    const processedData = {};
    Object.entries(formData).forEach(([key, value]) => {
      // Convert to number for numerical fields
      if (value !== '' && !isNaN(value)) {
        processedData[key] = parseFloat(value);
      } else {
        processedData[key] = value;
      }
    });
    
    onFormSubmit(processedData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Clinical Data Input</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight (Kg)
            </label>
            <input
              type="number"
              name="Weight (Kg)"
              value={formData['Weight (Kg)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Cycle Regularity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cycle Regularity (0-Regular, 1-Irregular)
            </label>
            <select
              name="Cycle(R/I)"
              value={formData['Cycle(R/I)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select</option>
              <option value="0">Regular</option>
              <option value="1">Irregular</option>
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Regular cycles: 21-35 days with consistent patterns
            </p>
          </div>

          {/* Cycle length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cycle Length (days)
            </label>
            <input
              type="number"
              name="Cycle length(days)"
              value={formData['Cycle length(days)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Normal range: 21-35 days
            </p>
          </div>

          {/* Beta-HCG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Beta-HCG (mIU/mL)
            </label>
            <input
              type="number"
              name="beta-HCG(mIU/mL)"
              value={formData['beta-HCG(mIU/mL)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Ideal range: &lt; 5 in non-pregnant individuals
            </p>
          </div>

          {/* FSH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              FSH (mIU/mL)
            </label>
            <input
              type="number"
              name="FSH(mIU/mL)"
              value={formData['FSH(mIU/mL)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Ideal range: 4.7–21.5 mIU/mL
            </p>
          </div>

          {/* LH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              LH (mIU/mL)
            </label>
            <input
              type="number"
              name="LH(mIU/mL)"
              value={formData['LH(mIU/mL)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Ideal range: 5–20 mIU/mL
            </p>
          </div>

          {/* FSH/LH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              FSH/LH Ratio
            </label>
            <input
              type="number"
              name="FSH/LH"
              value={formData['FSH/LH']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Ideal ratio: ~1.5 (lower ratios may indicate PCOS)
            </p>
          </div>

          {/* Hip */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Hip (inch)
            </label>
            <input
              type="number"
              name="Hip(inch)"
              value={formData['Hip(inch)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* TSH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              TSH (mIU/L)
            </label>
            <input
              type="number"
              name="TSH (mIU/L)"
              value={formData['TSH (mIU/L)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Normal range: 0.5–5 mIU/L
            </p>
          </div>

          {/* AMH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              AMH (ng/mL)
            </label>
            <input
              type="number"
              name="AMH(ng/mL)"
              value={formData['AMH(ng/mL)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Normal range: 1.0–4.0 ng/mL
            </p>
          </div>

          {/* PRL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              PRL (ng/mL)
            </label>
            <input
              type="number"
              name="PRL(ng/mL)"
              value={formData['PRL(ng/mL)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Normal range: 4.8–23.3 ng/mL
            </p>
          </div>

          {/* Vit D3 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Vitamin D3 (ng/mL)
            </label>
            <input
              type="number"
              name="Vit D3 (ng/mL)"
              value={formData['Vit D3 (ng/mL)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Normal range: 30–100 ng/mL
            </p>
          </div>

          {/* Follicle No. L */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Follicle No. (Left)
            </label>
            <input
              type="number"
              name="Follicle No. (L)"
              value={formData['Follicle No. (L)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Normal: &lt; 10–12 per ovary
            </p>
          </div>

          {/* Follicle No. R */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Follicle No. (Right)
            </label>
            <input
              type="number"
              name="Follicle No. (R)"
              value={formData['Follicle No. (R)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Normal: &lt; 10–12 per ovary
            </p>
          </div>

          {/* Avg F size L */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Avg. Follicle Size (Left) (mm)
            </label>
            <input
              type="number"
              name="Avg. F size (L) (mm)"
              value={formData['Avg. F size (L) (mm)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Ideal: 2–10 mm in follicular phase
            </p>
          </div>

          {/* Avg F size R */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Avg. Follicle Size (Right) (mm)
            </label>
            <input
              type="number"
              name="Avg. F size (R) (mm)"
              value={formData['Avg. F size (R) (mm)']}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              step="0.01"
              min="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Ideal: 2–10 mm in follicular phase
            </p>
          </div>
        </div>

        {/* Boolean inputs (checkboxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="Weight gain(Y/N)"
              checked={formData['Weight gain(Y/N)'] === '1'}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Weight Gain
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="hair growth(Y/N)"
              checked={formData['hair growth(Y/N)'] === '1'}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Excessive Hair Growth
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="Skin darkening (Y/N)"
              checked={formData['Skin darkening (Y/N)'] === '1'}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Skin Darkening
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="Fast food (Y/N)"
              checked={formData['Fast food (Y/N)'] === '1'}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Regular Fast Food Consumption
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Submit Clinical Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClinicalForm; 