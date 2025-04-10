import { useState, useEffect } from 'react';
import { Search, Filter, FileText, Trash2, Star, Download, Eye, Copy, Award, ChevronDown, ChevronUp, X, Upload, AlertTriangle } from 'lucide-react';

// Main DocuScan Page Component
const DocuScan = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [sortField, setSortField] = useState('ranking');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filters, setFilters] = useState({
    skills: [],
    experience: [],
    education: []
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockDocuments = [
      {
        id: 1,
        name: 'John_Smith_Resume.pdf',
        size: '420 KB',
        uploaded: '2025-04-01',
        ranking: 92,
        isDuplicate: false,
        parsed: {
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          experience: [
            { title: 'Senior Developer', company: 'TechCorp', duration: '2022-Present' },
            { title: 'Web Developer', company: 'CodeLabs', duration: '2019-2022' }
          ],
          education: [
            { degree: 'MS Computer Science', institution: 'Tech University', year: '2019' }
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']
        }
      },
      {
        id: 2,
        name: 'Jane_Doe_CV.pdf',
        size: '380 KB',
        uploaded: '2025-04-05',
        ranking: 87,
        isDuplicate: false,
        parsed: {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          phone: '(555) 987-6543',
          experience: [
            { title: 'Product Manager', company: 'InnovateSoft', duration: '2021-Present' },
            { title: 'UX Designer', company: 'DesignHub', duration: '2018-2021' }
          ],
          education: [
            { degree: 'MBA', institution: 'Business School', year: '2018' },
            { degree: 'BS Design', institution: 'Art University', year: '2016' }
          ],
          skills: ['Product Management', 'UI/UX', 'Agile', 'Figma', 'Market Research']
        }
      },
      {
        id: 3,
        name: 'Michael_Johnson_Resume.pdf',
        size: '410 KB',
        uploaded: '2025-04-07',
        ranking: 76,
        isDuplicate: true,
        duplicateOf: 4,
        parsed: {
          name: 'Michael Johnson',
          email: 'michael.j@example.com',
          phone: '(555) 234-5678',
          experience: [
            { title: 'Data Scientist', company: 'DataAnalytics Inc', duration: '2023-Present' },
            { title: 'Data Analyst', company: 'InsightCorp', duration: '2020-2023' }
          ],
          education: [
            { degree: 'PhD Statistics', institution: 'State University', year: '2020' }
          ],
          skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow']
        }
      },
      {
        id: 4,
        name: 'Mike_Johnson_CV.pdf',
        size: '405 KB',
        uploaded: '2025-04-08',
        ranking: 75,
        isDuplicate: true,
        duplicateOf: 3,
        parsed: {
          name: 'Michael Johnson',
          email: 'michael.j@example.com',
          phone: '(555) 234-5678',
          experience: [
            { title: 'Data Scientist', company: 'DataAnalytics Inc', duration: '2023-Present' },
            { title: 'Data Analyst', company: 'InsightCorp', duration: '2020-2023' }
          ],
          education: [
            { degree: 'PhD Statistics', institution: 'State University', year: '2020' }
          ],
          skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow']
        }
      },
      {
        id: 5,
        name: 'Sarah_Williams_Resume.pdf',
        size: '350 KB',
        uploaded: '2025-04-09',
        ranking: 94,
        isDuplicate: false,
        parsed: {
          name: 'Sarah Williams',
          email: 'sarah.w@example.com',
          phone: '(555) 345-6789',
          experience: [
            { title: 'Full Stack Developer', company: 'WebSolutions', duration: '2021-Present' },
            { title: 'Frontend Developer', company: 'UITech', duration: '2019-2021' }
          ],
          education: [
            { degree: 'BS Computer Science', institution: 'Tech Institute', year: '2019' }
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'TypeScript']
        }
      }
    ];
    
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = [...documents];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(doc => {
        const skills = doc.parsed.skills.join(' ').toLowerCase();
        const experience = doc.parsed.experience.map(e => `${e.title} ${e.company}`).join(' ').toLowerCase();
        const education = doc.parsed.education.map(e => `${e.degree} ${e.institution}`).join(' ').toLowerCase();
        const name = doc.parsed.name.toLowerCase();
        
        return skills.includes(query) || 
               experience.includes(query) || 
               education.includes(query) ||
               name.includes(query);
      });
    }
    
    // Apply filters
    if (filters.skills.length) {
      results = results.filter(doc => 
        filters.skills.some(skill => 
          doc.parsed.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }
    
    if (filters.experience.length) {
      results = results.filter(doc => 
        filters.experience.some(exp => 
          doc.parsed.experience.some(e => 
            e.title.toLowerCase().includes(exp.toLowerCase()) || 
            e.company.toLowerCase().includes(exp.toLowerCase())
          )
        )
      );
    }
    
    if (filters.education.length) {
      results = results.filter(doc => 
        filters.education.some(edu => 
          doc.parsed.education.some(e => 
            e.degree.toLowerCase().includes(edu.toLowerCase()) || 
            e.institution.toLowerCase().includes(edu.toLowerCase())
          )
        )
      );
    }
    
    // Sort results
    results.sort((a, b) => {
      if (sortField === 'ranking') {
        return sortDirection === 'desc' ? b.ranking - a.ranking : a.ranking - b.ranking;
      } else if (sortField === 'name') {
        return sortDirection === 'desc' 
          ? b.parsed.name.localeCompare(a.parsed.name) 
          : a.parsed.name.localeCompare(b.parsed.name);
      } else if (sortField === 'uploaded') {
        return sortDirection === 'desc' 
          ? new Date(b.uploaded) - new Date(a.uploaded) 
          : new Date(a.uploaded) - new Date(b.uploaded);
      }
      return 0;
    });
    
    setFilteredDocuments(results);
  }, [searchQuery, documents, filters, sortField, sortDirection]);

  // Handle ranking calculation based on job description
  const calculateRanking = () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description first');
      return;
    }
    
    // In a real application, this would call an AI/NLP service
    // This is a simple mock implementation
    const keyTerms = jobDescription.toLowerCase().split(/\s+/);
    
    const updatedDocuments = documents.map(doc => {
      const allDocTerms = [
        ...doc.parsed.skills,
        ...doc.parsed.experience.map(e => e.title),
        ...doc.parsed.education.map(e => e.degree)
      ].join(' ').toLowerCase();
      
      let matches = 0;
      keyTerms.forEach(term => {
        if (allDocTerms.includes(term)) matches++;
      });
      
      const ranking = Math.floor((matches / keyTerms.length) * 100);
      return {...doc, ranking};
    });
    
    setDocuments(updatedDocuments);
    setSortField('ranking');
    setSortDirection('desc');
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const addFilter = (type, value) => {
    if (value && !filters[type].includes(value)) {
      setFilters({
        ...filters,
        [type]: [...filters[type], value]
      });
    }
  };

  const removeFilter = (type, index) => {
    const newFilters = {...filters};
    newFilters[type].splice(index, 1);
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="text-orange-500" />
          <h1 className="text-xl font-bold">DocuScan</h1>
        </div>
        <div className="flex space-x-2">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <Upload size={16} />
            <span>Upload Documents</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Sidebar - Job Description & Ranking */}
        <div className="w-full md:w-64 p-4 border-r border-gray-800 bg-gray-900 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">AI Resume Ranking</h2>
          <textarea
            className="w-full h-48 bg-gray-800 rounded-md border border-gray-700 p-2 mb-4 text-white resize-none"
            placeholder="Paste job description here for AI-powered resume ranking..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md mb-4 flex items-center justify-center space-x-2"
            onClick={calculateRanking}
          >
            <Award size={16} />
            <span>Rank Resumes</span>
          </button>
          
          <h2 className="text-lg font-semibold mb-2">Active Filters</h2>
          <div className="mb-4">
            {Object.keys(filters).map(filterType => (
              <div key={filterType} className="mb-2">
                {filters[filterType].length > 0 && (
                  <div className="text-sm text-gray-400 mb-1 capitalize">{filterType}:</div>
                )}
                <div className="flex flex-wrap gap-2">
                  {filters[filterType].map((value, index) => (
                    <div key={index} className="bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center">
                      <span>{value}</span>
                      <button 
                        className="ml-2 text-gray-400 hover:text-white"
                        onClick={() => removeFilter(filterType, index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {Object.values(filters).every(arr => arr.length === 0) && (
              <div className="text-gray-500 text-sm">No active filters</div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-800 bg-gray-900">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Search by name, skills, experience..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md flex items-center space-x-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                <span>Filters</span>
                {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 bg-gray-800 p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Skills</label>
                  <div className="flex">
                    <input
                      id="skillInput"
                      className="bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 flex-1"
                      placeholder="Add skill..."
                    />
                    <button
                      className="bg-orange-500 hover:bg-orange-600 px-3 rounded-r-md"
                      onClick={() => {
                        const input = document.getElementById('skillInput');
                        addFilter('skills', input.value);
                        input.value = '';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Experience</label>
                  <div className="flex">
                    <input
                      id="expInput"
                      className="bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 flex-1"
                      placeholder="Job title or company..."
                    />
                    <button
                      className="bg-orange-500 hover:bg-orange-600 px-3 rounded-r-md"
                      onClick={() => {
                        const input = document.getElementById('expInput');
                        addFilter('experience', input.value);
                        input.value = '';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Education</label>
                  <div className="flex">
                    <input
                      id="eduInput"
                      className="bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 flex-1"
                      placeholder="Degree or institution..."
                    />
                    <button
                      className="bg-orange-500 hover:bg-orange-600 px-3 rounded-r-md"
                      onClick={() => {
                        const input = document.getElementById('eduInput');
                        addFilter('education', input.value);
                        input.value = '';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Count */}
          <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 text-sm text-gray-400">
            Found {filteredDocuments.length} documents
          </div>
          
          {/* Documents List */}
          <div className="flex-1 overflow-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Experience
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('uploaded')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {sortField === 'uploaded' && (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('ranking')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Match</span>
                      {sortField === 'ranking' && (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {filteredDocuments.map((doc) => (
                  <tr 
                    key={doc.id}
                    className={`hover:bg-gray-800 ${doc.isDuplicate ? 'bg-opacity-90 bg-yellow-900 bg-opacity-20' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-800 rounded">
                          <FileText className="text-blue-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white flex items-center">
                            {doc.parsed.name}
                            {doc.isDuplicate && (
                              <span className="ml-2 flex items-center text-yellow-500" title="Duplicate Document">
                                <AlertTriangle size={14} />
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">{doc.parsed.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {doc.parsed.skills.slice(0, 3).map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="bg-gray-800 text-gray-300 px-2 py-1 text-xs rounded-full"
                            onClick={() => addFilter('skills', skill)}
                          >
                            {skill}
                          </span>
                        ))}
                        {doc.parsed.skills.length > 3 && (
                          <span className="text-gray-500 text-xs">+{doc.parsed.skills.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        {doc.parsed.experience[0]?.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        {doc.parsed.experience[0]?.company}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(doc.uploaded).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium px-2 py-1 rounded-full text-center w-16 ${
                        doc.ranking > 90 ? 'bg-green-900 text-green-300' :
                        doc.ranking > 75 ? 'bg-blue-900 text-blue-300' :
                        'bg-gray-800 text-gray-300'
                      }`}>
                        {doc.ranking}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button 
                          className="text-gray-400 hover:text-white" 
                          title="View Document"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setShowPdfViewer(true);
                          }}
                        >
                          <Eye size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-white" title="Download">
                          <Download size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-white" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPdfViewer && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-full flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-medium">{selectedDocument.parsed.name}</h3>
                {selectedDocument.isDuplicate && (
                  <div className="flex items-center text-yellow-500 bg-yellow-900 bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    <AlertTriangle size={14} className="mr-1" />
                    Duplicate Document
                  </div>
                )}
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowPdfViewer(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* PDF Preview */}
              <div className="flex-1 bg-gray-800 overflow-auto p-4 h-96 md:h-auto">
                <div className="h-full w-full flex items-center justify-center bg-gray-900 rounded-lg">
                  {/* This would be your actual PDF viewer component */}
                  <div className="text-center">
                    <FileText size={64} className="mx-auto text-blue-400 mb-4" />
                    <p className="text-gray-400">Preview of {selectedDocument.name}</p>
                    <p className="text-gray-500 text-sm mt-2">Integration with PDF.js or similar would go here</p>
                  </div>
                </div>
              </div>
              
              {/* Resume Details */}
              <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-800 overflow-auto">
                <div className="p-4">
                  <h4 className="font-medium mb-2">Extracted Data</h4>
                  
                  <div className="mb-4">
                    <h5 className="text-sm text-gray-400 mb-1">Contact</h5>
                    <p className="text-sm">{selectedDocument.parsed.email}</p>
                    <p className="text-sm">{selectedDocument.parsed.phone}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm text-gray-400 mb-1">Skills</h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedDocument.parsed.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-800 text-gray-300 px-2 py-1 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm text-gray-400 mb-1">Experience</h5>
                    {selectedDocument.parsed.experience.map((exp, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="text-sm font-medium">{exp.title}</p>
                        <p className="text-xs text-gray-400">{exp.company} | {exp.duration}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm text-gray-400 mb-1">Education</h5>
                    {selectedDocument.parsed.education.map((edu, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="text-sm font-medium">{edu.degree}</p>
                        <p className="text-xs text-gray-400">{edu.institution} | {edu.year}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="text-sm text-gray-400 mb-2">Match Score</h5>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          selectedDocument.ranking > 90 ? 'bg-green-500' :
                          selectedDocument.ranking > 75 ? 'bg-blue-500' :
                          'bg-gray-600'
                        }`}
                        style={{ width: `${selectedDocument.ranking}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm mt-1">{selectedDocument.ranking}%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-800 flex justify-between">
              <div>
                {selectedDocument.isDuplicate && (
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
                    <Trash2 size={16} />
                    <span>Delete Duplicate</span>
                  </button>
                )}
              </div>
              <div className="flex space-x-3">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                  Download
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocuScan