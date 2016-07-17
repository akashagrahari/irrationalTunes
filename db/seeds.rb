# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Number.create(:name => 'Pi', :character => '&Pi;', :unicode => '\u03C0', :glyphicon => '')
Number.create(:name => 'Euler\'s number', :character => 'e', :unicode => 'e', :glyphicon => '')
Number.create(:name => 'Square Root of 2', :character => '&Sqrt;2', :unicode => '\u221A2', :glyphicon => '')
Number.create(:name => 'Tau', :character => '&tau;', :unicode => '\u03C4', :glyphicon => '')

Note.create(:name => 'A', :note => 'A', :qualifier => '')
Note.create(:name => 'B flat', :note => 'B', :qualifier => '&#9837;')
Note.create(:name => 'B', :note => 'B', :qualifier => '')
Note.create(:name => 'C', :note => 'C', :qualifier => '')
Note.create(:name => 'C sharp', :note => 'C', :qualifier => '#')
Note.create(:name => 'D', :note => 'D', :qualifier => '')
Note.create(:name => 'E flat', :note => 'E', :qualifier => '&#9837;')
Note.create(:name => 'E', :note => 'E', :qualifier => '')
Note.create(:name => 'F', :note => 'F', :qualifier => '')
Note.create(:name => 'F sharp', :note => 'F', :qualifier => '#')
Note.create(:name => 'G', :note => 'G', :qualifier => '')
Note.create(:name => 'G sharp', :note => 'G', :qualifier => '#')

Scale.create(:name => 'Major', :formula =>'2212221')
Scale.create(:name => 'Natural Minor Scale', :formula =>'2122122')
Scale.create(:name => 'Harmonic Minor Scale', :formula =>'2122131')
Scale.create(:name => 'Melodic Minor Scale Upwards', :formula =>'2122221')
Scale.create(:name => 'Melodic Minor Scale Downwards', :formula =>'2212212')
Scale.create(:name => 'Minor Pentatonic', :formula =>'32232')
Scale.create(:name => 'Minor Pentatonic', :formula =>'321132')

puts 'Success: Seed data loaded'






