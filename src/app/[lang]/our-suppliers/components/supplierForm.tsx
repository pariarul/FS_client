'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import countryData from '../../../../data/suppliers/country.json';

import { Lang, LocalizedText } from '@/utils/language';

// ---------- Full JSON Type ----------
interface SupplierFormContent {
    supplierForm: {
        heading: LocalizedText;
        description: LocalizedText;
        formFields: {
            fullname: LocalizedText;
            companyname: LocalizedText;
            email: LocalizedText;
            phone: LocalizedText;
            country: LocalizedText & { type: string; options: string[] };
            businessType: LocalizedText & {
                type: string;
                options: Record<'import' | 'export', LocalizedText>;
            };
            conditionalFields: {
                import: {
                    product: LocalizedText & {
                        type: 'dropdown';
                        categories: Record<string, LocalizedText & { items: LocalizedText[] }>;
                    };
                    category: LocalizedText & { type: string; dependsOn: string };
                    quantity: LocalizedText;
                    shippingLocation: LocalizedText;
                    specificInfo: LocalizedText;
                    enquiry: LocalizedText;
                };
                export: {
                    product: LocalizedText & {
                        type: 'dropdown';
                        categories: Record<string, LocalizedText & { items: LocalizedText[] }>;
                    };
                    website: LocalizedText;
                    capacity: LocalizedText;
                    certifications: LocalizedText;
                    specificInfo: LocalizedText;
                    enquiry: LocalizedText;
                };
            };
        };
        submitButton: LocalizedText;
    };
}

// ---------- Form State ----------
interface FormState {
    fullname: string;
    companyname: string;
    email: string;
    phone: string;
    country: string;
    businessType: 'import' | 'export' | '';
    product: string[];
    category: string[];
    quantity: string;
    shippingLocation: string;
    specificInfo: string;
    website: string;
    capacity: string;
    certifications: string;
    enquiry: string;
    [key: string]: string | string[];
}

// ---------- Component ----------
const SupplierForm: React.FC<{ lang: Lang; content: SupplierFormContent }> = ({
    lang,
    content,
}) => {
    // Handle both cases: content.supplierForm or content itself being the form data
    const data = content?.supplierForm || (content as any);

    const [form, setForm] = useState<FormState>({
        fullname: '',
        companyname: '',
        email: '',
        phone: '',
        country: '',
        businessType: '',
        product: [],
        category: [],
        quantity: '',
        shippingLocation: '',
        specificInfo: '',
        website: '',
        capacity: '',
        certifications: '',
        enquiry: '',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('+94');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [countrySearchTerm, setCountrySearchTerm] = useState('');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [isBusinessTypeOpen, setIsBusinessTypeOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!data || !data.formFields) {
        return <div className="p-8 text-center text-gray-400">Loading form content...</div>;
    }

    const filteredPhoneCodes = countryData.countryCodes.filter(
        ({ code, country }) => {
            const name = country[lang] ?? country.en;
            return code.includes(searchTerm) || name.toLowerCase().includes(searchTerm.toLowerCase());
        }
    );

    const filteredCountryNames = countryData.countryCodes.filter(
        ({ country }) => {
            const name = country[lang] ?? country.en;
            return name.toLowerCase().includes(countrySearchTerm.toLowerCase());
        }
    );

    const getText = (obj?: LocalizedText): string => obj?.[lang] ?? obj?.en ?? '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!form.fullname.trim() || !form.companyname.trim() || !form.email.trim() || !form.phone.trim() || !form.country.trim() || !form.businessType || form.product.length === 0) {
            alert('Please fill all required fields and select at least one product.');
            return;
        }

        // For import, category should be set automatically
        if (form.businessType === 'import' && (!form.category || form.category.length === 0)) {
            alert('Please select products to determine categories.');
            return;
        }

        const formData = {
            fullname: form.fullname.trim(),
            companyname: form.companyname.trim(),
            email: form.email.trim(),
            phone: selectedCountryCode + form.phone.trim(),
            country: form.country.trim(),
            businessType: form.businessType ? getText(data.formFields.businessType.options[form.businessType as 'import' | 'export']) : '',
            products: form.product,
            enquiry: form.enquiry.trim(),
            ...(form.businessType === 'import' && {
                category: form.category,
                quantity: form.quantity?.trim() || '',
                shippingLocation: form.shippingLocation?.trim() || '',
                specificInfo: form.specificInfo?.trim() || '',
            }),
            ...(form.businessType === 'export' && {
                website: form.website?.trim() || '',
                capacity: form.capacity?.trim() || '',
                certifications: form.certifications?.trim() || '',
                specificInfo: form.specificInfo?.trim() || '',
            }),
        };

        const now = new Date();
        const payload = {
            formData: formData,
            date: now.toISOString().split('T')[0],
            time: now.toTimeString().split(' ')[0]
        };

        console.log('Sending payload:', payload);

        setIsSubmitting(true);

        try {
            // Use correct API endpoint and port
            const API_BASE = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:8000/api';
            const response = await fetch(`${API_BASE}/supplier-form/create-supplierform`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Supplier form submitted successfully!');
                // Reset form
                setForm({
                    fullname: '',
                    companyname: '',
                    email: '',
                    phone: '',
                    country: '',
                    businessType: '',
                    product: [],
                    category: [],
                    quantity: '',
                    shippingLocation: '',
                    specificInfo: '',
                    website: '',
                    capacity: '',
                    certifications: '',
                    enquiry: '',
                });
                setSelectedCountryCode('+94');
                setSearchTerm('');
                setCountrySearchTerm('');
                setIsDropdownOpen(false);
                setIsCountryDropdownOpen(false);
                setIsProductDropdownOpen(false);
                setIsBusinessTypeOpen(false);
            } else {
                const errorData = await response.json();
                alert(`Failed to submit form: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper: Find unique categories from selected products
    const getCategoriesFromProducts = () => {
        if (!form.businessType || !form.product || form.product.length === 0) return [];
        const categories = data.formFields.conditionalFields[form.businessType]?.product?.categories;
        if (!categories) return [];
        const catSet = new Set<string>();
        form.product.forEach(prod => {
            for (const [key, cat] of Object.entries(categories) as [string, any][]) {
                if (cat.items?.some((item: any) => item.en === prod)) {
                    catSet.add(key);
                }
            }
        });
        return Array.from(catSet).map(key => ({ key, label: getText(categories[key]) }));
    };

    useEffect(() => {
        if (form.businessType === 'import') {
            const categories = getCategoriesFromProducts();
            setForm(prev => ({ ...prev, category: categories.map(c => c.label) }));
        } else {
            setForm(prev => ({ ...prev, category: [] }));
        }
    }, [form.businessType, form.product]);

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            product: [],
            category: []
        }));
    }, [form.businessType]);

    const allItems = form.businessType
        ? Object.values(data.formFields.conditionalFields[form.businessType].product.categories).flatMap(cat => cat.items)
        : [];

    const businessTypeDisplay = form.businessType
        ? getText(data.formFields.businessType.options[form.businessType as 'import' | 'export'])
        : getText({ en: 'Select Business Type', zh: '选择业务类型', si: 'ව්‍යාපාර වර්ගය තෝරන්න' });

    const selectedDisplay = form.product.length > 0
        ? form.product.map(enName => {
            const item = allItems.find(i => i.en === enName);
            return item ? getText(item) : enName;
        }).join(', ')
        : getText({ en: 'Select Products', zh: '选择产品', si: 'නිෂ්පාදන තෝරන්න' });

    return (
        <div>
            <div id="supplier-form-heading" className="text-center mb-8 max-w-4xl mx-auto pt-18">
                <h2 className="text-3xl text-(--color-primary) font-bold mb-4">{getText(data.heading)}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{getText(data.description)}</p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-(--color-primary)">
                {/* Full Name */}
                <div className="flex flex-col">
                    <label>{getText(data.formFields.fullname)}</label>
                    <input
                        type="text"
                        name="fullname"
                        value={form.fullname}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-3"
                        required
                    />
                </div>

                {/* Company Name */}
                <div className="flex flex-col">
                    <label>{getText(data.formFields.companyname)}</label>
                    <input
                        type="text"
                        name="companyname"
                        value={form.companyname}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-3"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label>{getText(data.formFields.email)}</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-3"
                        required
                    />
                </div>

                {/* Phone + Country Code */}
                <div className="flex flex-col">
                    <label>{getText(data.formFields.phone)}</label>
                    <div className="flex gap-2">
                        <div className="relative w-28">
                            <input
                                type="text"
                                value={searchTerm || selectedCountryCode}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setIsDropdownOpen(true);
                                }}
                                onFocus={() => setIsDropdownOpen(true)}
                                className="w-full border border-gray-300 rounded-lg p-3 pr-8 text-sm"
                                placeholder="+94"
                            />
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen((v) => !v)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                <ChevronDown size={16} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute z-20 mt-1 w-64 bg-(--color-background) border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                    {filteredPhoneCodes.length ? (
                                        filteredPhoneCodes.map(({ code, country, iso }, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-between p-2 cursor-pointer text-sm hover:bg-(--color-primary) hover:text-white ${selectedCountryCode === code ? 'bg-(--color-primary) text-white' : ''
                                                    }`}
                                                onClick={() => {
                                                    setSelectedCountryCode(code);
                                                    setSearchTerm('');
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                <span>{code} - {country[lang] ?? country.en}</span>
                                                {selectedCountryCode === code && <Check size={16} />}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-2 text-sm text-gray-500">No results</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={(e) => {
                                handlePhoneInput(e);
                                handleChange(e);
                            }}
                            className="flex-1 border border-gray-300 rounded-lg p-3"
                            placeholder={getText(data.formFields.phone)}
                            required
                        />
                    </div>
                </div>

                {/* Country */}
                <div className="flex flex-col">
                    <label>{getText(data.formFields.country)}</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={countrySearchTerm || form.country}
                            onChange={(e) => {
                                setCountrySearchTerm(e.target.value);
                                setIsCountryDropdownOpen(true);
                            }}
                            onFocus={() => setIsCountryDropdownOpen(true)}
                            className="w-full border border-gray-300 rounded-lg p-3 pr-8 text-sm"
                            placeholder="Type to search country"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setIsCountryDropdownOpen((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            <ChevronDown size={16} />
                        </button>

                        {isCountryDropdownOpen && (
                            <div className="absolute z-20 mt-1 w-full bg-(--color-background) border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                {filteredCountryNames.length ? (
                                    filteredCountryNames.map(({ country }, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-between p-2 cursor-pointer text-sm hover:bg-(--color-primary) hover:text-white ${form.country === (country[lang] || country.en) ? 'bg-(--color-primary) text-white' : ''}`}
                                            onClick={() => {
                                                setForm((prev) => ({ ...prev, country: country[lang] || country.en }));
                                                setCountrySearchTerm('');
                                                setIsCountryDropdownOpen(false);
                                            }}
                                        >
                                            <span>{country[lang] || country.en}</span>
                                            {form.country === (country[lang] || country.en) && <Check size={16} />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-2 text-sm text-gray-500">No results</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Business Type */}
                <div className="flex flex-col">
                    <label>{getText(data.formFields.businessType)}</label>
                    <div className="relative">
                        <div
                            className="border border-gray-300 rounded-lg p-3 pr-8 cursor-pointer flex justify-between items-center"
                            onClick={() => setIsBusinessTypeOpen(!isBusinessTypeOpen)}
                        >
                            {businessTypeDisplay}
                            <ChevronDown size={20} className={isBusinessTypeOpen ? 'rotate-180' : ''} />
                        </div>
                        {isBusinessTypeOpen && (
                            <div className="absolute z-20 mt-1 w-full bg-(--color-background) border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                {Object.entries(data.formFields.businessType.options).map(([key, txt]) => (
                                    <div
                                        key={key}
                                        className={`p-2 cursor-pointer hover:bg-(--color-primary) hover:text-white ${form.businessType === key ? 'bg-(--color-primary) text-white' : ''}`}
                                        onClick={() => {
                                            setForm(prev => ({ ...prev, businessType: key as 'import' | 'export' }));
                                            setIsBusinessTypeOpen(false);
                                        }}
                                    >
                                        {getText(txt)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Dropdown (Conditional) */}
                {form.businessType && (
                    <div className="flex flex-col">
                        <label>
                            {getText(data.formFields.conditionalFields[form.businessType].product)}
                        </label>
                        <div className="relative">
                            <div
                                className="border border-gray-300 rounded-lg p-3 pr-8 cursor-pointer flex justify-between items-center"
                                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                            >
                                {selectedDisplay}
                                <ChevronDown size={20} className={isProductDropdownOpen ? 'rotate-180' : ''} />
                            </div>
                            {isProductDropdownOpen && (
                                <div
                                    className="absolute z-20 mt-1 w-full bg-(--color-background) border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                                    onMouseLeave={() => setIsProductDropdownOpen(false)}
                                >
                                    {allItems.map((item, idx) => {
                                        const isSelected = form.product.includes(item.en);
                                        return (
                                            <div
                                                key={idx}
                                                className={`flex items-center p-2 cursor-pointer hover:bg-(--color-primary) hover:text-white ${isSelected ? 'bg-(--color-primary) text-white' : ''}`}
                                                onClick={() => {
                                                    setForm(prev => {
                                                        const newProducts = isSelected
                                                            ? prev.product.filter(p => p !== item.en)
                                                            : [...prev.product, item.en];
                                                        return { ...prev, product: newProducts };
                                                    });
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => { }}
                                                    className="mr-2"
                                                />
                                                {getText(item)}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Category — ONLY for import */}
                {form.businessType === 'import' && form.product.length > 0 && (
                    <div className="flex flex-col">
                        <label>{getText(data.formFields.conditionalFields.import.category)}</label>
                        <input
                            type="text"
                            value={getCategoriesFromProducts().map(c => c.label).join(', ') || ''}
                            readOnly
                            className="border border-gray-300 rounded-lg p-3"
                            placeholder="Auto-filled from products"
                        />
                    </div>
                )}

                {/* Other Conditional Fields (quantity, website, etc.) */}
                {form.businessType && (
                    <>
                        {Object.entries(data.formFields.conditionalFields[form.businessType])
                            .filter(([key]) => !['product', 'category', 'enquiry'].includes(key))
                            .map(([key, field]) => {
                                const label = getText(field as LocalizedText);
                                const isRequired = key === 'quantity' || key === 'website' ? false : false;

                                return (
                                    <div key={key} className="flex flex-col">
                                        <label>{label}</label>
                                        <input
                                            type="text"
                                            name={key}
                                            value={form[key] || ''}
                                            onChange={handleChange}
                                            className="border border-gray-300 rounded-lg p-3"
                                            placeholder={label}
                                            {...(isRequired ? { required: true } : {})}
                                        />
                                    </div>
                                );
                            })}
                    </>
                )}

                {/* Enquiry Details Field - Full Width on New Row */}
                {form.businessType && (
                    <div className="md:col-span-2 flex flex-col">
                        <label>{getText(data.formFields.conditionalFields[form.businessType].enquiry)}</label>
                        <textarea
                            name="enquiry"
                            value={form.enquiry}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-3 h-32 resize-vertical"
                            placeholder={getText(data.formFields.conditionalFields[form.businessType].enquiry)}
                            rows={5}
                        />
                    </div>
                )}

                {/* Submit */}
                <div className="md:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-(--color-primary) text-white font-semibold py-2 px-6 rounded-4xl hover:bg-(--color-primary)/85 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            getText(data.submitButton)
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export type { SupplierFormContent };
export default SupplierForm;