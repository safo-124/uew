'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FileText, BookOpen, GraduationCap, Clock, Calendar, MapPin, Car, Hash, User,
  Book, Award, Plus, Minus, CarTaxiFront, Bus
} from 'lucide-react'

type ClaimFormProps = {
  isSubmitting?: boolean
}

export function ClaimForm({ isSubmitting = false }: ClaimFormProps) {
  const [claimType, setClaimType] = useState<'TEACHING' | 'THESIS'>('TEACHING')
  const [studentCount, setStudentCount] = useState(1)
  const [isTransportation, setIsTransportation] = useState(false)
  const [transportType, setTransportType] = useState<'PRIVATE' | 'PUBLIC'>('PRIVATE')
  const [thesisType, setThesisType] = useState<'SUPERVISION' | 'EXAMINATION'>('SUPERVISION')

  const addStudent = () => setStudentCount(prev => Math.min(prev + 1, 10))
  const removeStudent = () => setStudentCount(prev => Math.max(prev - 1, 1))

  return (
    <form action="/dashboard/lecturer/claims" method="POST" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Claim Type */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Claim Type
          </Label>
          <Select
            value={claimType}
            onValueChange={(val: 'TEACHING' | 'THESIS') => setClaimType(val)}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select claim type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TEACHING">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Teaching Claim
                </div>
              </SelectItem>
              <SelectItem value="THESIS">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Thesis Claim
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="claimType" value={claimType} />
        </div>

        {/* Common Fields */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date
          </Label>
          <Input type="date" name="date" required disabled={isSubmitting} />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            Course Code
          </Label>
          <Input type="text" name="courseCode" required disabled={isSubmitting} />
        </div>
      </div>

      {/* Teaching Claim Fields */}
      {claimType === 'TEACHING' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Contact Hours
              </Label>
              <Input type="number" name="contactHours" min="1" required disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time
              </Label>
              <Input type="time" name="startTime" required disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                End Time
              </Label>
              <Input type="time" name="endTime" required disabled={isSubmitting} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="transportCheckbox"
                name="transportation"
                checked={isTransportation}
                onChange={() => setIsTransportation(!isTransportation)}
                disabled={isSubmitting}
              />
              <Label htmlFor="transportCheckbox" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Include Transportation Claim
              </Label>
            </div>

            {isTransportation && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CarTaxiFront className="h-4 w-4" />
                    Transport Type
                  </Label>
                  <Select
                    value={transportType}
                    onValueChange={(val: 'PRIVATE' | 'PUBLIC') => setTransportType(val)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PRIVATE">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          Private Vehicle
                        </div>
                      </SelectItem>
                      <SelectItem value="PUBLIC">
                        <div className="flex items-center gap-2">
                          <Bus className="h-4 w-4" />
                          Public Transport
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="transportType" value={transportType} />
                </div>

                {transportType === 'PRIVATE' && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Vehicle Number Plate
                    </Label>
                    <Input 
                      type="text" 
                      name="vehicleNumberPlate" 
                      placeholder="e.g. ABC 1234" 
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Destination From
                  </Label>
                  <Input 
                    type="text" 
                    name="destinationFrom" 
                    placeholder="Starting location" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Destination To
                  </Label>
                  <Input 
                    type="text" 
                    name="destinationTo" 
                    placeholder="Destination" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Thesis Claim Fields */}
      {claimType === 'THESIS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Thesis Type
              </Label>
              <Select 
                name="thesisType" 
                value={thesisType}
                onValueChange={(val: 'SUPERVISION' | 'EXAMINATION') => setThesisType(val)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUPERVISION">Supervision</SelectItem>
                  <SelectItem value="EXAMINATION">Examination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Degree
              </Label>
              <Select name="degree" disabled={isSubmitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="MPHIL">MPhil</SelectItem>
                  <SelectItem value="MA">MA</SelectItem>
                  <SelectItem value="ED">Ed</SelectItem>
                  <SelectItem value="PGDE">PGDE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Only show student fields for supervision */}
          {thesisType === 'SUPERVISION' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Students (Max 10)
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeStudent}
                    disabled={studentCount <= 1 || isSubmitting}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center px-2 border rounded-md">
                    {studentCount}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addStudent}
                    disabled={studentCount >= 10 || isSubmitting}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {Array.from({ length: studentCount }).map((_, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <Input 
                    name={`students[${i}].studentNumber`} 
                    placeholder="Student Number" 
                    required 
                    disabled={isSubmitting} 
                  />
                  <Input 
                    name={`students[${i}].studentName`} 
                    placeholder="Student Name" 
                    required 
                    disabled={isSubmitting} 
                  />
                  <Input 
                    name={`students[${i}].thesisTitle`} 
                    placeholder="Thesis Title" 
                    required 
                    disabled={isSubmitting} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Claim'}
      </Button>
    </form>
  )
}