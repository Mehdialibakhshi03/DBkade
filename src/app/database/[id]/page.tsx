'use client'; // Mark as Client Component

import React, { useState, useMemo } from 'react';
import {
  Database, Download, FileJson, FileText, File, Code,
  Copy, Eye, Calendar, HardDrive, BarChart, Check, Filter, ArrowLeft, Info, Star,
  Cloud, RefreshCw, Link, X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast"; // Import useToast hook


// Mock data as provided in the original user request
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
    { id: 'province', label: 'استان', type: 'select', options: ['تهران', 'اصفهان', 'خراسان رضوی', 'فارس', 'آذربایجان شرقی'] },
    { id: 'population', label: 'جمعیت', type: 'range', min: 0, max: 500000 },
  ]
};

// Define filter state interface
interface FilterState {
  id: string;
  value: any;
}


export default function DatabaseDetail() {
  const { toast } = useToast(); // Initialize toast hook
  const [selectedColumns, setSelectedColumns] = useState<string[]>(databaseInfo.columns.map(c => c.name)); // Default all columns selected
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'sql' | 'xlsx' | 'curl' | 'js' | 'python'>('csv');
  const [selectedFilters, setSelectedFilters] = useState<FilterState[]>([]);
  const [showAPIDialog, setShowAPIDialog] = useState(false);
  const [apiCodeFormat, setApiCodeFormat] = useState<'curl' | 'js' | 'python'>('curl');

  // Toggle column selection
  const toggleColumn = (columnName: string) => {
    setSelectedColumns(prev =>
      prev.includes(columnName)
        ? prev.filter(col => col !== columnName)
        : [...prev, columnName]
    );
  };

  // Add a filter (placeholder, actual implementation depends on filter UI)
  const addFilter = (filterId: string) => {
     // For demo, add a placeholder filter state
     // In a real app, this would capture the value from the input/select
    const existingFilterIndex = selectedFilters.findIndex(f => f.id === filterId);
    const filterDefinition = databaseInfo.filters.find(f => f.id === filterId);

    if (!filterDefinition) return;

    let newValue: any;
    if(filterDefinition.type === 'select') {
      newValue = filterDefinition.options?.[0]; // Default to first option
    } else if(filterDefinition.type === 'range') {
      newValue = { min: filterDefinition.min, max: filterDefinition.max }; // Default to full range
    } else {
      newValue = ''; // Default for other types
    }

    if (existingFilterIndex === -1) {
       setSelectedFilters([...selectedFilters, { id: filterId, value: newValue }]);
       toast({ title: "فیلتر اضافه شد", description: `فیلتر "${filterDefinition.label}" اضافه شد.` });
    } else {
       // Optionally update existing filter or notify user
       toast({ title: "فیلتر موجود است", description: `فیلتر "${filterDefinition.label}" از قبل وجود دارد.` });
    }
  };

  // Remove a filter
  const removeFilter = (filterId: string) => {
    const filterDefinition = databaseInfo.filters.find(f => f.id === filterId);
    setSelectedFilters(prev => prev.filter(f => f.id !== filterId));
    if (filterDefinition) {
        toast({ title: "فیلتر حذف شد", description: `فیلتر "${filterDefinition.label}" حذف شد.`, variant: "destructive" });
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters([]);
    toast({ title: "همه فیلترها حذف شدند", variant: "destructive" });
  };


  // Generate sample API code
  const generateSampleCode = useMemo(() => {
    const columnsParam = selectedColumns.join(',');
    const filterParams = selectedFilters.map(f => `${f.id}=${encodeURIComponent(JSON.stringify(f.value))}`).join('&');
    const fullParams = `columns=${columnsParam}${filterParams ? `&${filterParams}` : ''}`;

    if (apiCodeFormat === 'curl') {
      return `curl -X GET "https://api.datapress.ir/v1/databases/postal-codes?${fullParams}" \\
  -H "Authorization: Bearer YOUR_API_KEY"`;
    } else if (apiCodeFormat === 'js') {
      return `// با استفاده از fetch در جاوااسکریپت
fetch('https://api.datapress.ir/v1/databases/postal-codes?${fullParams}', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;
    } else if (apiCodeFormat === 'python') {
      return `# با استفاده از requests در پایتون
import requests
import json

url = "https://api.datapress.ir/v1/databases/postal-codes"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {
    "columns": "${columnsParam}",
${selectedFilters.map(f => `    "${f.id}": json.dumps(${JSON.stringify(f.value)})`).join(',\n')}
}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(data)`;
    }
    return '';
  }, [selectedColumns, selectedFilters, apiCodeFormat]);

  // Copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSampleCode)
      .then(() => {
         toast({ title: "کپی شد!", description: "کد نمونه در کلیپ‌بورد کپی شد." });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({ title: "خطا", description: "امکان کپی در کلیپ‌بورد وجود ندارد.", variant: "destructive" });
      });
  };

  // Calculate approximate download size (very basic example)
  const approximateSize = useMemo(() => {
    const baseSize = 4.2; // MB for all data
    const columnRatio = selectedColumns.length / databaseInfo.columns.length;
    // Filter impact is harder to estimate without knowing data distribution
    // For simplicity, let's assume filters reduce size proportionally to a fixed factor if active
    const filterFactor = selectedFilters.length > 0 ? 0.7 : 1.0;
    const estimatedSize = baseSize * columnRatio * filterFactor;
    return `${estimatedSize.toFixed(1)} مگابایت`;
  }, [selectedColumns, selectedFilters]);


  // Filter preview data based on selected columns
   const filteredPreviewData = useMemo(() => {
       return databaseInfo.previewData.map(row => {
           const filteredRow: { [key: string]: any } = {};
           selectedColumns.forEach(colName => {
               if (row.hasOwnProperty(colName)) {
                   filteredRow[colName] = row[colName];
               }
           });
           return filteredRow;
       });
   }, [selectedColumns, databaseInfo.previewData]);

   // Get headers for the preview table based on selected columns
   const previewTableHeaders = useMemo(() => {
       return databaseInfo.columns.filter(col => selectedColumns.includes(col.name));
   }, [selectedColumns, databaseInfo.columns]);


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-xl font-bold">دیتا اکسپلورر</h1>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
             {/* Consider using Link component for navigation */}
             <a href="/">
               <Button variant="ghost">
                 <ArrowLeft className="w-4 h-4 ml-2" />
                 بازگشت به خانه
               </Button>
             </a>
             <Button>
              ورود / ثبت‌نام
             </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-muted-foreground">
             {/* Consider using Link component for navigation */}
             <a href="/" className="hover:text-primary">خانه</a>
            <span className="mx-2">/</span>
            {/* Update this link if categories exist */}
            <a href="#" className="hover:text-primary">دسته جغرافیا</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{databaseInfo.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Dataset Info */}
          <div className="lg:w-3/4 space-y-6">
            {/* Dataset Header Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="mb-2">{databaseInfo.title}</CardTitle>
                     <div className="flex flex-wrap gap-1 mb-3">
                      {databaseInfo.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                     </div>
                    <CardDescription>
                      {databaseInfo.description}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="text-yellow-500 hover:text-yellow-600">
                    <Star className="w-5 h-5" />
                    <span className="sr-only">افزودن به علاقه‌مندی</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-muted-foreground">آخرین بروزرسانی</div>
                      <div className="font-medium">{databaseInfo.lastUpdate}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-muted-foreground">تعداد رکورد</div>
                      <div className="font-medium">{databaseInfo.recordCount.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-muted-foreground">تعداد دانلود</div>
                      <div className="font-medium">{databaseInfo.downloadCount.toLocaleString()}</div>
                    </div>
                  </div>
                   <div className="flex items-center space-x-2 space-x-reverse">
                    <HardDrive className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-muted-foreground">حجم</div>
                      <div className="font-medium">{databaseInfo.size}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Column Selection & Filters Card */}
            <Card>
              <CardHeader>
                <CardTitle>انتخاب ستون‌ها و فیلتر</CardTitle>
              </CardHeader>
              <CardContent>
                 <h3 className="text-md font-semibold mb-3">انتخاب ستون‌ها</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {databaseInfo.columns.map((column) => (
                    <div key={column.name} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={`column-${column.name}`}
                        checked={selectedColumns.includes(column.name)}
                        onCheckedChange={() => toggleColumn(column.name)}
                      />
                      <Label htmlFor={`column-${column.name}`} className="text-sm font-normal cursor-pointer">
                        {column.label}
                        <span className="text-xs text-muted-foreground mr-1">({column.type})</span>
                      </Label>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <h3 className="text-md font-semibold mb-3">فیلترها</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {databaseInfo.filters.map((filter) => (
                     <Card key={filter.id} className="bg-secondary/30">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{filter.label}</span>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => addFilter(filter.id)}
                             disabled={selectedFilters.some(f => f.id === filter.id)} // Disable if already added
                           >
                             <Filter className="w-3 h-3 ml-1" />
                             افزودن
                           </Button>
                        </div>

                        {filter.type === 'range' && filter.min !== undefined && filter.max !== undefined && (
                          <div className="flex items-center space-x-2 space-x-reverse pt-2">
                             <span className="text-xs text-muted-foreground">{filter.min.toLocaleString()}</span>
                             {/* Range slider - Using basic input range for simplicity */}
                             <Input
                               type="range"
                               min={filter.min}
                               max={filter.max}
                               className="w-full h-2 cursor-pointer"
                               // onChange/value would be needed for interactive filtering
                               disabled={!selectedFilters.some(f => f.id === filter.id)} // Enable only if filter is active
                             />
                             <span className="text-xs text-muted-foreground">{filter.max.toLocaleString()}</span>
                          </div>
                        )}
                         {filter.type === 'select' && filter.options && (
                           <div className="flex flex-wrap gap-1 pt-1">
                             {filter.options.slice(0, 3).map((option, idx) => (
                               <Badge key={idx} variant="outline">{option}</Badge>
                             ))}
                             {filter.options.length > 3 && (
                               <Badge variant="outline">+{filter.options.length - 3} مورد دیگر</Badge>
                             )}
                           </div>
                         )}
                         {/* Placeholder for other filter types */}
                         {filter.type !== 'range' && filter.type !== 'select' && (
                            <p className="text-xs text-muted-foreground pt-1">کنترل فیلتر نوع '{filter.type}' در اینجا قرار می‌گیرد.</p>
                         )}
                      </CardContent>
                     </Card>
                  ))}
                </div>

                 {selectedFilters.length > 0 && (
                   <div className="space-y-2">
                     <Label className="text-xs text-muted-foreground">فیلترهای فعال:</Label>
                     <div className="flex flex-wrap gap-2">
                      {selectedFilters.map((filterState) => {
                        const filter = databaseInfo.filters.find(f => f.id === filterState.id);
                        return (
                           <Badge key={filterState.id} variant="default" className="flex items-center">
                            <span>{filter?.label}</span>
                             <Button
                               variant="ghost"
                               size="icon"
                               className="h-4 w-4 mr-1 text-primary-foreground hover:bg-primary/80"
                               onClick={() => removeFilter(filterState.id)}
                             >
                               <X className="w-3 h-3" />
                               <span className="sr-only">حذف فیلتر</span>
                             </Button>
                           </Badge>
                        );
                      })}
                      <Button variant="link" size="sm" className="text-red-500 px-1" onClick={clearAllFilters}>حذف همه</Button>
                     </div>
                   </div>
                 )}

              </CardContent>
            </Card>

            {/* Preview Table Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>پیش‌نمایش داده‌ها</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="w-4 h-4 ml-1" />
                    نمایش {filteredPreviewData.length} از {databaseInfo.recordCount.toLocaleString()} رکورد
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                         {previewTableHeaders.map((column) => (
                           <TableHead key={column.name}>
                             {column.label}
                           </TableHead>
                         ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {filteredPreviewData.map((row, rowIdx) => (
                         <TableRow key={rowIdx}>
                           {previewTableHeaders.map((column) => (
                             <TableCell key={column.name} className="whitespace-nowrap">
                               {/* Display formatted value or placeholder */}
                               {row[column.name] !== undefined && row[column.name] !== null
                                 ? String(row[column.name])
                                 : '-'}
                             </TableCell>
                           ))}
                         </TableRow>
                       ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Download Card */}
            <Card>
              <CardHeader>
                <CardTitle>دریافت خروجی</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label className="block text-sm font-medium mb-2">فرمت خروجی</Label>
                  <div className="grid grid-cols-2 gap-2">
                     {(['csv', 'json', 'sql', 'xlsx'] as const).map((format) => (
                      <Button
                        key={format}
                        variant={exportFormat === format ? 'default' : 'outline'}
                        onClick={() => setExportFormat(format)}
                        className="flex items-center justify-center"
                      >
                         {format === 'csv' && <FileText className="w-4 h-4 ml-2" />}
                         {format === 'json' && <FileJson className="w-4 h-4 ml-2" />}
                         {format === 'sql' && <Code className="w-4 h-4 ml-2" />}
                         {format === 'xlsx' && <File className="w-4 h-4 ml-2" />}
                        <span>{format.toUpperCase()}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ستون‌های انتخاب شده:</span>
                    <span className="font-medium">{selectedColumns.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">فیلترهای اعمال شده:</span>
                    <span className="font-medium">{selectedFilters.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">حجم تقریبی:</span>
                    <span className="font-medium">{approximateSize}</span>
                  </div>
                </div>

                <Button className="w-full mb-3">
                  <Download className="w-5 h-5 ml-2" />
                  دانلود {exportFormat.toUpperCase()}
                </Button>

                <Dialog open={showAPIDialog} onOpenChange={setShowAPIDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Code className="w-5 h-5 ml-2" />
                      دریافت از طریق API
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>دسترسی از طریق API</DialogTitle>
                    </DialogHeader>
                    <div className="p-6 pt-0">
                       <p className="text-muted-foreground mb-6">
                        برای استفاده از API دیتاپرس، ابتدا باید یک کلید API از پنل کاربری خود دریافت کنید. سپس می‌توانید با استفاده از کد زیر به داده‌ها دسترسی داشته باشید.
                       </p>

                       <div className="mb-4">
                         <div className="flex border rounded-lg overflow-hidden mb-2">
                           {(['curl', 'js', 'python'] as const).map((format) => (
                             <Button
                               key={format}
                               variant={apiCodeFormat === format ? 'secondary' : 'ghost'}
                               onClick={() => setApiCodeFormat(format)}
                               className="flex-1 rounded-none first:rounded-r-none last:rounded-l-none border-l last:border-l-0"
                             >
                               {format === 'curl' && 'cURL'}
                               {format === 'js' && 'JavaScript'}
                               {format === 'python' && 'Python'}
                             </Button>
                           ))}
                         </div>
                         <div className="relative bg-muted rounded-lg p-4 font-mono text-sm dir-ltr text-left overflow-x-auto">
                           <pre><code>{generateSampleCode}</code></pre>
                           <Button
                             variant="ghost"
                             size="icon"
                             className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:bg-background/50"
                             onClick={copyToClipboard}
                           >
                             <Copy className="w-4 h-4" />
                             <span className="sr-only">کپی</span>
                           </Button>
                         </div>
                       </div>
                        <div className="text-xs text-muted-foreground">
                            <Link className="inline-block w-3 h-3 ml-1"/>
                            <a href="#" className="hover:underline">مستندات کامل API</a>
                        </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-primary/10 border-primary/30">
               <CardContent className="p-4">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary mb-1">نکات استفاده</h3>
                    <p className="text-sm text-primary/80">
                      این دیتاست به طور مرتب بروزرسانی می‌شود. اطلاعات کدپستی باید به عنوان رشته متنی (String) در نظر گرفته شوند نه عدد.
                    </p>
                  </div>
                </div>
               </CardContent>
            </Card>

            {/* Related Datasets Card */}
            <Card>
              <CardHeader>
                <CardTitle>دیتاست‌های مرتبط</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    {/* Consider using Link component for navigation */}
                    <a href="#" className="flex items-center text-sm hover:text-primary group">
                      <Database className="w-4 h-4 ml-2 text-muted-foreground group-hover:text-primary" />
                      تقسیمات کشوری ایران
                    </a>
                  </li>
                  <li>
                    {/* Consider using Link component for navigation */}
                    <a href="#" className="flex items-center text-sm hover:text-primary group">
                      <Database className="w-4 h-4 ml-2 text-muted-foreground group-hover:text-primary" />
                      مختصات جغرافیایی شهرهای ایران
                    </a>
                  </li>
                  <li>
                    {/* Consider using Link component for navigation */}
                    <a href="#" className="flex items-center text-sm hover:text-primary group">
                      <Database className="w-4 h-4 ml-2 text-muted-foreground group-hover:text-primary" />
                      جمعیت شهرهای ایران
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

       {/* Footer (Optional) */}
       <footer className="border-t mt-12 py-6">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
           &copy; {new Date().getFullYear()} دیتا اکسپلورر. تمامی حقوق محفوظ است.
         </div>
       </footer>
    </div>
  );
}
