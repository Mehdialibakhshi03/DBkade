# **App Name**: Data Explorer

## Core Features:

- Column Selection: Allow users to select which columns from the dataset to display in the table.
- Data Filtering: Enable users to filter the dataset based on different criteria (e.g., province, population range).
- Data Export: Provide options to download the filtered and selected data in various formats (CSV, JSON, SQL, XLSX).

## Style Guidelines:

- Primary color: White for backgrounds to ensure readability.
- Secondary color: Gray-800 for dark backgrounds and elements.
- Accent: Teal-500 for interactive elements and highlights.
- Use a clear and readable sans-serif font for the main content.
- Use a responsive layout that adapts to different screen sizes.
- Use simple and consistent icons from Lucide React for visual clarity.

## Original User Request:
import React, { useState } from 'react';
import { 
  Database, Download, FileJson, FileText, File, Code, 
  Copy, Eye, Calendar, HardDrive, BarChart, Check, Filter, ArrowLeft, Info, Star, 
  Cloud, RefreshCw, Link, X
} from 'lucide-react';

export default function DatabaseDetail() {
  const [selectedColumns, setSelectedColumns] = useState(['id', 'province', 'city', 'code']);
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showAPIDialog, setShowAPIDialog] = useState(false);
  
  // داده‌های نمونه
  const databaseInfo = {
    title: 'کدپستی شهرهای ایران',
    description: 'مجموعه کامل کدهای پستی ۱۰ رقمی تمام شهرها و روستاهای ایران به تفکیک استان',
    lastUpdate: '۱۴۰۳/۰۱/۲۰',
    recordCount: 148329,
    downloadCount: 3764,
    size: '4.2 مگابایت',
    tags: ['جغرافیا', 'ایران', 'کدپستی', 'شهرها', 'روستاها'],
    columns: [
      { name: 'id', label: 'شناسه', type: 'number' },
      { name: 'province', label: 'استان', type: 'string' },
      { name: 'city', label: 'شهر/روستا', type: 'string' },
      { name: 'district', label: 'منطقه', type: 'string' },
      { name: 'code', label: 'کد پستی', type: 'string' },
      { name: 'latitude', label: 'عرض جغرافیایی', type: 'number' },
      { name: 'longitude', label: 'طول جغرافیایی', type: 'number' },
      { name: 'population', label: 'جمعیت تقریبی', type: 'number' },
      { name: 'update_date', label: 'تاریخ بروزرسانی', type: 'date' },
    ],
    previewData: [
      { id: 1, province: 'تهران', city: 'تهران', district: 'منطقه ۱', code: '1234567890', latitude: 35.807933, longitude: 51.4329, population: 126789, update_date: '1402/12/01' },
      { id: 2, province: 'تهران', city: 'تهران', district: 'منطقه ۲', code: '1234567891', latitude: 35.774664, longitude: 51.3884, population: 135642, update_date: '1402/12/01' },
      { id: 3, province: 'تهران', city: 'تهران', district: 'منطقه ۳', code: '1234567892', latitude: 35.796023, longitude: 51.4400, population: 98745, update_date: '1402/12/01' },
      { id: 4, province: 'اصفهان', city: 'اصفهان', district: 'منطقه مرکزی', code: '8134567890', latitude: 32.654288, longitude: 51.6675, population: 87453, update_date: '1402/11/15' },
      { id: 5, province: 'اصفهان', city: 'اصفهان', district: 'شمال شرقی', code: '8134567891', latitude: 32.670120, longitude: 51.7012, population: 65432, update_date: '1402/11/15' },
    ],
    filters: [
      { id: 'province', label: 'استان', options: ['تهران', 'اصفهان', 'خراسان رضوی', 'فارس', 'آذربایجان شرقی'] },
      { id: 'population', label: 'جمعیت', type: 'range', min: 0, max: 500000 },
    ]
  };

  // تغییر وضعیت انتخاب ستون‌ها
  const toggleColumn = (columnName) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter(col => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // اضافه کردن فیلتر
  const addFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  // حذف فیلتر
  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  // تولید کد API نمونه براساس انتخاب‌های کاربر
  const generateSampleCode = () => {
    const columnsParam = selectedColumns.join(',');
    let code = '';
    
    if (exportFormat === 'curl') {
      code = `curl -X GET "https://api.datapress.ir/v1/databases/postal-codes?columns=${columnsParam}" \\
  -H "Authorization: Bearer YOUR_API_KEY"`;
    } else if (exportFormat === 'js') {
      code = `// با استفاده از fetch در جاوااسکریپت
fetch('https://api.datapress.ir/v1/databases/postal-codes?columns=${columnsParam}', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;
    } else if (exportFormat === 'python') {
      code = `# با استفاده از requests در پایتون
import requests

url = "https://api.datapress.ir/v1/databases/postal-codes"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"columns": "${columnsParam}"}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(data)`;
    }
    
    return code;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans" dir="rtl">
      {/* هدر */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-blue-500 ml-2" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">دیتاپرس</h1>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              ورود / ثبت‌نام
            </button>
          </div>
        </div>
      </header>

      {/* مسیر ناوبری */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-blue-500">خانه</a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-blue-500">دسته جغرافیا</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{databaseInfo.title}</span>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* اطلاعات اصلی دیتاست */}
          <div className="lg:w-3/4">
            {/* هدر دیتاست */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{databaseInfo.title}</h1>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {databaseInfo.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {databaseInfo.description}
                  </p>
                </div>
                <button className="flex items-center text-yellow-500 hover:text-yellow-600">
                  <Star className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-2" />
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">آخرین بروزرسانی</div>
                    <div className="font-medium text-gray-900 dark:text-white">{databaseInfo.lastUpdate}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Database className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-2" />
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">تعداد رکورد</div>
                    <div className="font-medium text-gray-900 dark:text-white">{databaseInfo.recordCount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-2" />
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">تعداد دانلود</div>
                    <div className="font-medium text-gray-900 dark:text-white">{databaseInfo.downloadCount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <HardDrive className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-2" />
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">حجم</div>
                    <div className="font-medium text-gray-900 dark:text-white">{databaseInfo.size}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* بخش انتخاب ستون‌ها و فیلتر */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">انتخاب ستون‌ها</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                {databaseInfo.columns.map((column) => (
                  <div key={column.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`column-${column.name}`}
                      checked={selectedColumns.includes(column.name)}
                      onChange={() => toggleColumn(column.name)}
                      className="h-4 w-4 text-blue-500 border-gray-300 rounded ml-2"
                    />
                    <label htmlFor={`column-${column.name}`} className="text-sm text-gray-700 dark:text-gray-300">
                      {column.label}
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">({column.type})</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">فیلترها</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {databaseInfo.filters.map((filter) => (
                    <div key={filter.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{filter.label}</span>
                        <button 
                          onClick={() => addFilter(filter.id)} 
                          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          افزودن فیلتر
                        </button>
                      </div>
                      
                      {filter.type === 'range' ? (
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{filter.min}</span>
                          <input
                            type="range"
                            min={filter.min}
                            max={filter.max}
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{filter.max}</span>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {filter.options.slice(0, 3).map((option, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                              {option}
                            </span>
                          ))}
                          {filter.options.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">+ {filter.options.length - 3} مورد دیگر</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {selectedFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedFilters.map((filterId) => {
                      const filter = databaseInfo.filters.find(f => f.id === filterId);
                      return (
                        <div key={filterId} className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                          <span>{filter.label}</span>
                          <button onClick={() => removeFilter(filterId)} className="ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                    <button className="text-xs text-blue-500 hover:text-blue-700">حذف همه فیلترها</button>
                  </div>
                )}
              </div>
            </div>
            
            {/* جدول پیش‌نمایش */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">پیش‌نمایش داده‌ها</h2>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Eye className="w-4 h-4 ml-1" />
                  نمایش {databaseInfo.previewData.length} از {databaseInfo.recordCount.toLocaleString()} رکورد
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      {databaseInfo.columns.filter(col => selectedColumns.includes(col.name)).map((column) => (
                        <th 
                          key={column.name}
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {databaseInfo.previewData.map((row, rowIdx) => (
                      <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                        {databaseInfo.columns
                          .filter(col => selectedColumns.includes(col.name))
                          .map((column) => (
                            <td key={column.name} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {row[column.name]}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* سایدبار */}
          <div className="lg:w-1/4">
            {/* بخش دانلود */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">دریافت خروجی</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">فرمت خروجی</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`flex items-center justify-center p-3 rounded border ${
                      exportFormat === 'csv' 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300' 
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setExportFormat('csv')}
                  >
                    <FileText className="w-5 h-5 ml-2" />
                    <span>CSV</span>
                  </button>
                  <button 
                    className={`flex items-center justify-center p-3 rounded border ${
                      exportFormat === 'json' 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300' 
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setExportFormat('json')}
                  >
                    <FileJson className="w-5 h-5 ml-2" />
                    <span>JSON</span>
                  </button>
                  <button 
                    className={`flex items-center justify-center p-3 rounded border ${
                      exportFormat === 'sql' 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300' 
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setExportFormat('sql')}
                  >
                    <Code className="w-5 h-5 ml-2" />
                    <span>SQL</span>
                  </button>
                  <button 
                    className={`flex items-center justify-center p-3 rounded border ${
                      exportFormat === 'xlsx' 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300' 
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setExportFormat('xlsx')}
                  >
                    <File className="w-5 h-5 ml-2" />
                    <span>XLSX</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تعداد ستون‌های انتخاب شده:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedColumns.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">فیلترهای اعمال شده:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedFilters.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">حجم تقریبی:</span>
                  <span className="font-medium text-gray-900 dark:text-white">2.8 مگابایت</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors mb-3">
                <Download className="w-5 h-5 ml-2" />
                دانلود {exportFormat.toUpperCase()}
              </button>

              <button 
                onClick={() => setShowAPIDialog(true)}
                className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                <Code className="w-5 h-5 ml-2" />
                دریافت از طریق API
              </button>
            </div>
            
            {/* بخش اطلاعات تکمیلی */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-500 ml-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">نکات استفاده</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    این دیتاست به طور مرتب بروزرسانی می‌شود. اطلاعات کدپستی باید به عنوان رشته متنی (String) در نظر گرفته شوند نه عدد.
                  </p>
                </div>
              </div>
            </div>
            
            {/* بخش دیتاست‌های مشابه */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">دیتاست‌های مرتبط</h2>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    <Database className="w-4 h-4 ml-2 text-gray-400" />
                    تقسیمات کشوری ایران
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    <Database className="w-4 h-4 ml-2 text-gray-400" />
                    مختصات جغرافیایی شهرهای ایران
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    <Database className="w-4 h-4 ml-2 text-gray-400" />
                    جمعیت شهرهای ایران
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* مودال API */}
      {showAPIDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto" dir="rtl">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">دسترسی از طریق API</h3>
              <button onClick={() => setShowAPIDialog(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                برای استفاده از API دیتاپرس، ابتدا باید یک کلید API از پنل کاربری خود دریافت کنید. سپس می‌توانید با استفاده از کد زیر به داده‌ها دسترسی داشته باشید.
              </p>
              
              <div className="mb-4">
                <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg mb-1">
                  <button 
                    className={`px-4 py-2 text-sm ${exportFormat === 'curl' ? 'bg-gray-100 dark:bg-gray-700 font-medium' : 'bg-white dark:bg-gray-800'}`}
                    onClick={() => setExportFormat('curl')}
                  >
                    cURL
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm ${exportFormat === 'js' ? 'bg-gray-100 dark:bg-gray-700 font-medium' : 'bg-white dark:bg-gray-800'}`}
                    onClick={() => setExportFormat('js')}
                  >
                    JavaScript
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm ${exportFormat === 'python' ?
اینو کامل کن
  